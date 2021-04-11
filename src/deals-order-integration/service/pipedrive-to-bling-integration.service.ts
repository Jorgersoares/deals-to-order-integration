import {
  HttpStatus,
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { OrderService } from '../services-integration/order/order.service';
import { DealService } from '../services-integration/deal/deal.service';
import { parse } from 'js2xmlparser';
import { converterDealToOrderBling } from '../../shared/utils/bling/converter-deal-to-order-bling.function';
import { InjectModel } from '@nestjs/mongoose';
import {
  OrderStats,
  OrderStatsDocument,
} from '../../orders-report/schemas/order-stats-schema';
import { Model } from 'mongoose';
import { format } from 'date-fns';
import { DealsToOrderIntegrationService } from './deals-to-order-integration.service';
import { Deal, DealResponseDto } from '../../shared/dtos/deal-response.dto';
import { DealsOrderIntegrationResponseDto } from '../../shared/dtos/deals-order-integration-response.dto';
import { AxiosResponse } from 'axios';

@Injectable()
export class PipedriveToBlingIntegrationService extends DealsToOrderIntegrationService {
  constructor(
    private orderService: OrderService,
    private dealService: DealService,
    @InjectModel(OrderStats.name)
    private orderStatsModel: Model<OrderStatsDocument>,
  ) {
    super();
  }

  private readonly logger = new Logger(PipedriveToBlingIntegrationService.name);
  private exportDealsQuantity: number;
  private dealResponse: AxiosResponse<DealResponseDto>;
  private deals: Deal[];
  private insertOrderResponse: AxiosResponse;

  async dealToOrder(): Promise<DealsOrderIntegrationResponseDto> {
    try {
      this.exportDealsQuantity = 0;
      this.dealResponse = await this.dealService.getDealsWon();
      this.deals = this.dealResponse.data.data;
      for (const deal of this.deals) {
        await this.insertOrder(deal);
      }
      return new DealsOrderIntegrationResponseDto(this.exportDealsQuantity);
    } catch (error) {
      this.logger.error(error, null, 'INTEGRATION');
      throw new InternalServerErrorException();
    }
  }

  async insertOrder(deal: Deal) {
    try {
      this.insertOrderResponse = await this.orderService.insertOrder(
        parse('pedido', converterDealToOrderBling(deal)),
      );
      if (this.insertOrderResponse.status === HttpStatus.CREATED.valueOf()) {
        this.exportDealsQuantity += 1;
        await this.saveOrUpdateOrderStats(deal.value);
      } else {
        this.logger.error(this.insertOrderResponse.data, null, 'ORDER');
      }
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  private async saveOrUpdateOrderStats(value) {
    await this.orderStatsModel.findOneAndUpdate(
      {
        date: format(new Date(), 'dd/MM/yyyy'),
      },
      {
        $inc: {
          amount: value,
        },
      },
      {
        upsert: true,
      },
    );
  }
}

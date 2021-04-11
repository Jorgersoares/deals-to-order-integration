import { HttpStatus, Injectable , Logger } from '@nestjs/common';
import { OrderService } from '../services-integration/order/order.service';
import { DealService } from '../services-integration/deal/deal.service';
import { parse } from 'js2xmlparser';
import { converterDealToOrder } from '../../shared/utils/converter-deal-to-order.function';
import { InjectModel } from '@nestjs/mongoose';
import {
  OrderStats,
  OrderStatsDocument,
} from '../../orders-report/schemas/order-stats-schema';
import { Model } from 'mongoose';
import { format } from 'date-fns';

@Injectable()
export class PipedriveToBlingIntegrationService {
  constructor(
    private orderService: OrderService,
    private dealService: DealService,
    @InjectModel(OrderStats.name)
    private orderStatsModel: Model<OrderStatsDocument>,
  ) {}

  private readonly logger = new Logger(PipedriveToBlingIntegrationService.name);
  private exportDealsQuantity = 0;

  dealToOrder() {
    this.dealService.getDealsWon().subscribe(
      (res) => {
        res.data.data.forEach((deal) => {
          this.orderService
            .insertOrder(parse('pedido', converterDealToOrder(deal)))
            .subscribe(
              (res) => {
                if (res.status === HttpStatus.CREATED.valueOf()) {
                  this.exportDealsQuantity += 1;
                  this.saveOrUpdateOrderStats(deal.value);
                } else {
                  this.logger.error(res.data, null, 'ORDER');
                }
              },
              (error) => {
                this.logger.error(error, null, 'ORDER');
              },
            );
        });
      },
      (error) => {
        this.logger.error(error, null, 'DEAL');
      },
    );
    return { exportDealsQuantity: this.exportDealsQuantity };
  }

  private saveOrUpdateOrderStats(value) {
    this.orderStatsModel
      .findOneAndUpdate(
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
      )
      .then(() => null);
  }

  private insertOrder()
}

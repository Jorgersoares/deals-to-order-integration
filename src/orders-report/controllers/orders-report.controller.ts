import { Controller, Get } from '@nestjs/common';
import { OrdersReportService } from '../orders-report.service';
import {
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { OrderStats } from '../schemas/order-stats-schema';

@ApiTags('Report endpoints')
@Controller('orders-report')
export class OrdersReportController {
  constructor(private ordersReportService: OrdersReportService) {}

  @Get()
  @ApiOkResponse({
    description:
      'Returns the report of the total value of orders registered in Bling per day',
    type: [OrderStats],
  })
  @ApiInternalServerErrorResponse({
    description: '\n' + 'Error fetching report',
  })
  async report() {
    return await this.ordersReportService.listAllReports();
  }
}

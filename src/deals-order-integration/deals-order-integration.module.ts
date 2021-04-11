import { HttpModule, Module } from '@nestjs/common';
import { DealService } from './services-integration/deal/deal.service';
import { DealPipedriveService } from './services-integration/deal/deal-pipedrive.service';
import { TasksService } from './job/job-integration.service';
import { OrderService } from './services-integration/order/order.service';
import { OrderBlingService } from './services-integration/order/order-bling.service';
import { PipedriveToBlingIntegrationService } from './service/pipedrive-to-bling-integration.service';
import { OrdersReportModule } from '../orders-report/orders-report.module';
import { DealsOrderIntegrationController } from './controllers/deals-order-integration.controller';
import { DealsToOrderIntegrationService } from './service/deals-to-order-integration.service';

@Module({
  imports: [HttpModule, OrdersReportModule],
  controllers: [DealsOrderIntegrationController],
  providers: [
    {
      provide: DealService,
      useClass: DealPipedriveService,
    },
    {
      provide: OrderService,
      useClass: OrderBlingService,
    },
    TasksService,
    {
      provide: DealsToOrderIntegrationService,
      useClass: PipedriveToBlingIntegrationService,
    },
  ],
  exports: [
    {
      provide: DealService,
      useClass: DealPipedriveService,
    },
    {
      provide: OrderService,
      useClass: OrderBlingService,
    },
    {
      provide: DealsToOrderIntegrationService,
      useClass: PipedriveToBlingIntegrationService,
    },
  ],
})
export class DealsOrderIntegrationModule {}

import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { DealsToOrderIntegrationService } from '../service/deals-to-order-integration.service';

@Injectable()
export class TasksService {
  constructor(private dealsOrderIntegration: DealsToOrderIntegrationService) {}

  @Cron(CronExpression.EVERY_DAY_AT_6PM)
  handleCron() {
    this.dealsOrderIntegration.dealToOrder();
  }
}

import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { DealsToOrderIntegrationService } from '../service/deals-to-order-integration.service';

@Injectable()
export class TasksService {
  constructor(private dealsOrderIntegration: DealsToOrderIntegrationService) {}
  private readonly logger = new Logger(TasksService.name);

  @Cron(CronExpression.EVERY_5_MINUTES)
  handleCron() {
    this.dealsOrderIntegration.dealToOrder();
  }
}

import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { OrderStats, OrderStatsSchema } from './schemas/order-stats-schema';
import { OrdersReportService } from './orders-report.service';
import { OrdersReportController } from './controllers/orders-report.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: OrderStats.name, schema: OrderStatsSchema },
    ]),
  ],
  controllers: [OrdersReportController],
  exports: [
    MongooseModule.forFeature([
      { name: OrderStats.name, schema: OrderStatsSchema },
    ]),
  ],
  providers: [OrdersReportService],
})
export class OrdersReportModule {}

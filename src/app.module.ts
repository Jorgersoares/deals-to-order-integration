import { Module } from '@nestjs/common';
import { DealsOrderIntegrationModule } from './deals-order-integration/deals-order-integration.module';
import { OrdersReportModule } from './orders-report/orders-report.module';
import { SharedModule } from './shared/shared.module';
import { ScheduleModule } from '@nestjs/schedule';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import 'dotenv/config';

@Module({
  imports: [
    DealsOrderIntegrationModule,
    OrdersReportModule,
    SharedModule,
    ScheduleModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGODB_ATLAS_URL),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

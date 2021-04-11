import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { OrderStats, OrderStatsDocument } from './schemas/order-stats-schema';
import { Model } from 'mongoose';

@Injectable()
export class OrdersReportService {
  constructor(
    @InjectModel(OrderStats.name)
    private orderStatsModel: Model<OrderStatsDocument>,
  ) {}

  async listAllReports(): Promise<OrderStats[]> {
    let reports;
    try {
      reports = await this.orderStatsModel.find();
    } catch (err) {
      throw new InternalServerErrorException();
    }
    return reports;
  }
}

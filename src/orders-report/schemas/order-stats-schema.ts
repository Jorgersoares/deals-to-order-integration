import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';

export type OrderStatsDocument = OrderStats & Document;

@Schema()
export class OrderStats {
  @Prop()
  @ApiProperty()
  date: string;

  @Prop()
  @ApiProperty()
  amount: number;
}
export const OrderStatsSchema = SchemaFactory.createForClass(OrderStats);

import { OrderService } from './order.service';
import { HttpService, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class OrderBlingService extends OrderService {
  constructor(
    private httpService: HttpService,
    private configService: ConfigService,
  ) {
    super();
  }
  API_URL = this.configService.get<string>('BLING_API_URL');
  API_KEY = this.configService.get<string>('BLING_API_TOKEN');

  insertOrder(order) {
    const params = new URLSearchParams();
    params.append('apikey', this.API_KEY);
    params.append('xml', order);
    return this.httpService
      .post<any>(`${this.API_URL}/pedido/json/`, params)
      .toPromise();
  }
}

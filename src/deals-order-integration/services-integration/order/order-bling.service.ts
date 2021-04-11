import { OrderService } from './order.service';
import { HttpService } from '@nestjs/common';

export class OrderBlingService extends OrderService {
  constructor(private httpService: HttpService) {
    super();
  }
  API_URL = 'https://bling.com.br/Api/v2/pedido/json/';

  insertOrder(xml: string) {
    const params = new URLSearchParams();
    params.append(
      'apikey',
      '9bf8a354b9aa185fa8c9ceb6cf816cd246884cce4f77bb5cae01050304982f5f4ab17324',
    );
    params.append('xml', xml);
    return this.httpService.post(this.API_URL, params);
  }
}

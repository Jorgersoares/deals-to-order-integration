import { AxiosResponse } from 'axios';

export abstract class OrderService {
  abstract insertOrder(order): Promise<AxiosResponse<any>>;
}

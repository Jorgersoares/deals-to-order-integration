import { DealResponseDto } from '../../../shared/dtos/deal-response.dto';
import { AxiosResponse } from 'axios';

export abstract class DealService {
  abstract getDealsWonToday(): Promise<AxiosResponse<DealResponseDto>>;
}

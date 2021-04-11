import { DealResponseDto } from '../../../shared/dtos/deal-response.dto';
import { AxiosResponse } from 'axios';

export abstract class DealService {
  abstract getDealsWon(): Promise<AxiosResponse<DealResponseDto>>;
}

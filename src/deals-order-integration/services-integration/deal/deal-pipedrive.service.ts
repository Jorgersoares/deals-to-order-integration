import { HttpService, Injectable } from '@nestjs/common';
import { DealResponseDto } from '../../../shared/dtos/deal-response.dto';
import { DealService } from './deal.service';

@Injectable()
export class DealPipedriveService extends DealService {
  constructor(private httpService: HttpService) {
    super();
  }

  API_URL =
    'https://api.pipedrive.com/v1/deals?status=won&start=0&api_token=b22c19aa05cb524997d8bb134cf08a10f92afe50';

  getDealsWon() {
    return this.httpService.get<DealResponseDto>(this.API_URL);
  }
}

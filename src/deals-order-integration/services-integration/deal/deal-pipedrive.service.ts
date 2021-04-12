import { HttpService, Injectable } from '@nestjs/common';
import { DealResponseDto } from '../../../shared/dtos/deal-response.dto';
import { DealService } from './deal.service';
import { AxiosResponse } from 'axios';
import { ConfigService } from '@nestjs/config';
import { format } from 'date-fns';

@Injectable()
export class DealPipedriveService extends DealService {
  constructor(
    private httpService: HttpService,
    private configService: ConfigService,
  ) {
    super();
  }

  API_URL = this.configService.get<string>('PIPEDRIVE_API_URL');
  API_KEY = this.configService.get<string>('PIPEDRIVE_API_TOKEN');

  getDealsWonToday(): Promise<AxiosResponse<DealResponseDto>> {
    const today = format(new Date(), 'yyyy-MM-dd');
    return this.httpService
      .get<DealResponseDto>(
        `${this.API_URL}/deals/timeline?start_date=${today}&interval=day&amount=1&field_key=won_time&filter_id=2&api_token=${this.API_KEY}`,
      )
      .toPromise();
  }
}

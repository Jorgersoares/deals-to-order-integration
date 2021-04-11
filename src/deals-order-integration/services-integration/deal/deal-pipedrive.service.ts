import { HttpService, Injectable } from '@nestjs/common';
import { DealResponseDto } from '../../../shared/dtos/deal-response.dto';
import { DealService } from './deal.service';
import { AxiosResponse } from 'axios';
import { ConfigService } from '@nestjs/config';

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

  getDealsWon(): Promise<AxiosResponse<DealResponseDto>> {
    return this.httpService
      .get<DealResponseDto>(
        `${this.API_URL}/deals?status=won&start=0&api_token=${this.API_KEY}`,
      )
      .toPromise();
  }
}

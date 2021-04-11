import { ApiProperty } from '@nestjs/swagger';

export class DealsOrderIntegrationResponseDto {
  constructor(dealsExported) {
    this.exportDeals = dealsExported;
  }
  @ApiProperty()
  exportDeals: number;
}

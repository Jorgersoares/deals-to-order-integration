import { ApiProperty } from '@nestjs/swagger';

export class DealsOrderIntegrationResponseDto {
  constructor(dealsExported) {
    this.exportDealsQuantity = dealsExported;
  }
  @ApiProperty()
  exportDealsQuantity: number;
}

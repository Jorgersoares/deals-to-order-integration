import { Controller, Get, InternalServerErrorException } from '@nestjs/common';
import { DealsToOrderIntegrationService } from '../service/deals-to-order-integration.service';
import {
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { DealsOrderIntegrationResponseDto } from '../../shared/dtos/deals-order-integration-response.dto';

@ApiTags('Integration endpoints')
@Controller('deals-order-integration')
export class DealsOrderIntegrationController {
  constructor(
    private dealsOrderIntegrationService: DealsToOrderIntegrationService,
  ) {}

  @Get()
  @ApiOkResponse({
    description:
      'performs the\n' +
      ' integration and returns the amount of deals exported to the bing',
    type: DealsOrderIntegrationResponseDto,
  })
  @ApiInternalServerErrorResponse({
    description: 'Error in the execution of the integration',
  })
  async integration() {
    return await this.dealsOrderIntegrationService.dealToOrder();
  }
}

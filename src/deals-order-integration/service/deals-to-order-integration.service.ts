import { Deal } from '../../shared/dtos/deal-response.dto';
import { DealsOrderIntegrationResponseDto } from '../../shared/dtos/deals-order-integration-response.dto';

export abstract class DealsToOrderIntegrationService {
  abstract dealToOrder(): Promise<DealsOrderIntegrationResponseDto>;
  abstract insertOrder(deal: Deal);
}

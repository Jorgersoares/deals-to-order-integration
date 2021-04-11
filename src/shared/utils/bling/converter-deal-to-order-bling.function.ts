import { Deal } from '../../dtos/deal-response.dto';

export function converterDealToOrderBling(deal: Deal) {
  return {
    cliente: {
      nome: deal.person_name,
    },
    itens: {
      item: {
        codigo: deal.id,
        qtde: 1,
        vlr_unit: deal.value,
      },
    },
  };
}

export interface Deal {
  id: number;
  person_name: string;
  value: number;
}

export interface DealResponseDataDto {
  deals: Deal[];
}

export interface DealResponseDto {
  data: DealResponseDataDto[];
}

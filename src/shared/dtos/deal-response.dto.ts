export interface Deal {
  id: number;
  person_name: string;
  value: number;
}
export interface DealResponseDto {
  data: Deal[];
}

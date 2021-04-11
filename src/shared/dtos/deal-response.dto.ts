export interface Deal {
  person_name: string;
  value: number;
  wontime: Date;
}
export interface DealResponse {
  data: Deal[];
}

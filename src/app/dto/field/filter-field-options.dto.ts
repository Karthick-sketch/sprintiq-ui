export interface FilterFieldOptionDTO {
  id: number;
  value: string;
}

export class FilterFieldOptionsDTO {
  status: FilterFieldOptionDTO[] = [];
  priority: FilterFieldOptionDTO[] = [];
}

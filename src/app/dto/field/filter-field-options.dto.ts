export interface FilterFieldOptionDTO {
  id: number;
  label: string;
}

export class FilterFieldOptionsDTO {
  status: FilterFieldOptionDTO[] = [];
  priority: FilterFieldOptionDTO[] = [];
}

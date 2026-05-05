import { FieldDTO } from '../field/field.dto';

export class TicketFieldDTO {
  id: number = 0;
  field: FieldDTO = new FieldDTO();
  value: string = '';
}

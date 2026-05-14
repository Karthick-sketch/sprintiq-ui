import { TicketFieldDTO } from './ticket-field.dto';

export class TicketListingDTO {
  id: number = 0;
  title: string = '';
  fields: TicketFieldDTO[] = [];
  projectId: number = 0;
}

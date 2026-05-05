import { ProjectTicketDTO } from '../project/project-ticket.dto';
import { TicketFieldDTO } from './ticket-field.dto';

export class TicketListingDTO {
  id: number = 0;
  title: string = '';
  fields: TicketFieldDTO[] = [];
  project: ProjectTicketDTO | null = null;
}

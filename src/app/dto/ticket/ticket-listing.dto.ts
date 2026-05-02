import { ProjectTicketDTO } from '../project/project-ticket.dto';

export class TicketListingDTO {
  id: number = 0;
  title: string = '';
  project: ProjectTicketDTO | null = null;
}

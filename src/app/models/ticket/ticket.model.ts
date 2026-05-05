import { TicketFieldDTO } from '../../dto/ticket/ticket-field.dto';
import { TicketComment } from './ticket-comment.model';

export class Ticket {
  id: number = 0;
  title: string = '';
  description: string = '';
  comments: TicketComment[] = [];
  ticketFields: TicketFieldDTO[] = [];
  subTickets: number[] = [];
  parentId: number = 0;
  projectId: number = 0;
  sectionId: number = 0;
  orderIndex: number = 0;
}

import { TicketComment } from '../../models/ticket/ticket-comment.model';
import { TicketFieldDTO } from './ticket-field.dto';

export class TicketDTO {
  id: number = 0;
  title: string = '';
  description: string = '';
  comments: TicketComment[] = [];
  fields: TicketFieldDTO[] = [];
  subTickets: number[] = [];
  parentId: number = 0;
  projectId: number = 0;
  sectionId: number = 0;
  orderIndex: number = 0;
}

export class TicketCreateRequestDTO {
  title: string = '';
  description: string = '';
  projectId: number = 0;
  sectionId: number = 0;
  orderIndex: number = 0;
}

export class TicketUpdateRequestDTO {
  id: number = 0;
  title: string = '';
  description: string = '';
  parentId: number | null = null;
  projectId: number = 0;
  sectionId: number = 0;
  orderIndex: number = 0;
}

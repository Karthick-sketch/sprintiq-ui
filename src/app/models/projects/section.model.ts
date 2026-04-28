import { TicketDTO } from '../../dto/ticket/ticket.dto';

export class Section {
  id: number = 0;
  title: string = '';
  tickets: TicketDTO[] = [];
  projectId: number = 0;
  orderIndex: number = 0;
}

import { SectionTicketDTO } from '../../dto/ticket/ticket.dto';

export class Section {
  id: number = 0;
  title: string = '';
  tickets: SectionTicketDTO[] = [];
  projectId: number = 0;
  orderIndex: number = 0;
}

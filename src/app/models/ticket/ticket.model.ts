import { TicketPriority } from '../../enums/ticket/priority.enums';
import { TicketStatus } from '../../enums/ticket/status.enums';

export class Ticket {
  id: number = 0;
  title: string = '';
  description: string = '';
  status: TicketStatus = TicketStatus.TODO;
  priority: TicketPriority = TicketPriority.MEDIUM;
  assigneeId: number = 0;
  dueDate: string = '';
  projectId: number = 0;
  sectionId: number = 0;
}

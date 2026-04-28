import { UserDTO } from '../../dto/user/user.dto';
import { TicketPriority } from '../../enums/ticket/ticket-priority.enums';
import { TicketStatus } from '../../enums/ticket/ticket-status.enums';

export class Ticket {
  id: number = 0;
  title: string = '';
  description: string = '';
  status: TicketStatus = TicketStatus.TODO;
  priority: TicketPriority = TicketPriority.MEDIUM;
  assignee: UserDTO | null = null;
  dueDate: string | null = null;
  projectId: number = 0;
  sectionId: number = 0;
  orderIndex: number = 0;
}

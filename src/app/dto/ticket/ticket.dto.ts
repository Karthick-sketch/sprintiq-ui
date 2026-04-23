import { TicketPriority } from '../../enums/ticket/ticket-priority.enums';
import { TicketStatus } from '../../enums/ticket/ticket-status.enums';
import { UserDTO } from '../user/user.dto';

export class TicketDTO {
  id: number = 0;
  title: string = '';
  description: string = '';
  status: TicketStatus = TicketStatus.TODO;
  priority: TicketPriority = TicketPriority.MEDIUM;
  assignee: UserDTO = new UserDTO();
  dueDate: string = '';
  projectId: number = 0;
  sectionId: number = 0;
}

export class TicketRequestDTO {
  title: string = '';
  description: string = '';
  status: TicketStatus = TicketStatus.TODO;
  priority: TicketPriority = TicketPriority.MEDIUM;
  assigneeId: number = 0;
  dueDate: string = '';
  projectId: number = 0;
  sectionId: number = 0;
}

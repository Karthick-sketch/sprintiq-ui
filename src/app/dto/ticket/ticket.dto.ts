import { TicketPriority } from '../../enums/ticket/ticket-priority.enums';
import { TicketStatus } from '../../enums/ticket/ticket-status.enums';
import { UserDTO } from '../user/user.dto';

export class TicketDTO {
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

export class TicketCreateRequestDTO {
  title: string = '';
  description: string = '';
  status: TicketStatus = TicketStatus.TODO;
  priority: TicketPriority = TicketPriority.MEDIUM;
  assigneeId: number = 0;
  dueDate: string | null = null;
  projectId: number = 0;
  sectionId: number = 0;
  orderIndex: number = 0;
}

export class TicketUpdateRequestDTO {
  id: number = 0;
  title: string = '';
  description: string = '';
  status: TicketStatus = TicketStatus.TODO;
  priority: TicketPriority = TicketPriority.MEDIUM;
  assigneeId: number = 0;
  dueDate: string | null = null;
  projectId: number = 0;
  sectionId: number = 0;
  orderIndex: number = 0;
}

import { TicketPriority } from '../../enums/ticket/ticket-priority.enums';
import { TicketStatus } from '../../enums/ticket/ticket-status.enums';

export class TicketFilter {
  search: string = '';

  // '' means "All" option
  status: TicketStatus | '' = '';
  priority: TicketPriority | '' = '';
  assignee: number | '' = '';
  project: number | '' = '';
}

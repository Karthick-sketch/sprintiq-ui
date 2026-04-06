import { Ticket } from '../ticket/ticket.model';

export interface Section {
  id: number;
  name: string;
  tickets: Ticket[];
  projectId: number;
}

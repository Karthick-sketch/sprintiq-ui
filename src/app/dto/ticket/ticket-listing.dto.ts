import { ProjectTicketDTO } from '../project/project-ticket.dto';
import { UserDTO } from '../user/user.dto';

export class TicketListingDTO {
  id: number = 0;
  title: string = '';
  status: string = '';
  priority: string = '';
  assignee: UserDTO = new UserDTO();
  dueDate: string = '';
  project: ProjectTicketDTO = new ProjectTicketDTO();
}

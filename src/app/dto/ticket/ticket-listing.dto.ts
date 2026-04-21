import { UserDTO } from '../user/user.dto';

export class TicketListingDTO {
  id: number = 0;
  title: string = '';
  status: string = '';
  priority: string = '';
  assignee: UserDTO = new UserDTO();
  dueDate: string = '';
  projectId: number = 0;
}

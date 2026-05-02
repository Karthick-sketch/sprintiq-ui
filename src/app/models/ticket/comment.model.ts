import { UserDTO } from '../../dto/user/user.dto';

export class Comment {
  id: number = 0;
  content: string = '';
  createdAt: Date = new Date();
  user: UserDTO | null = null;
}

import { Role } from '../../enums/user/role.enums';
import { UserStatus } from '../../enums/user/user-status.enums';

export class UserDTO {
  id: number = 0;
  email: string = '';
  name: string = '';
  role: Role = Role.USER;
  status: UserStatus = UserStatus.UNREGISTERED;
}

export class UserRegisterDTO {
  email: string = '';
  name: string = '';
  password: string = '';
}

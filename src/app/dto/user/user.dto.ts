import { Role } from '../../enums/user/role.enums';

export class UserDTO {
  id: number = 0;
  email: string = '';
  name: string = '';
  role: Role = Role.USER;
  active: boolean = true;
}

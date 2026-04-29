import { Component, OnInit } from '@angular/core';
import { UserDTO } from '../../../dto/user/user.dto';
import { UserService } from '../../../services/user/user.service';
import { UserFormComponent } from './user-form/user-form.component';
import { Role } from '../../../enums/user/role.enums';

@Component({
  selector: 'app-users',
  imports: [UserFormComponent],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css',
})
export class UsersComponent implements OnInit {
  users: UserDTO[] = [];
  isPanelOpen: boolean = false;
  selectedUser: UserDTO | null = null;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.getUsers();
  }

  get activeCount(): number {
    return this.users.filter((u) => u.active).length;
  }

  get adminCount(): number {
    return this.users.filter((u) => u.role === Role.ADMIN).length;
  }

  // ── Panel Controls ─────────────────────────────────────────────────────────

  openCreatePanel(): void {
    this.selectedUser = null;
    this.isPanelOpen = true;
  }

  openEditPanel(user: UserDTO): void {
    this.selectedUser = user;
    this.isPanelOpen = true;
  }

  onPanelClose(): void {
    this.isPanelOpen = false;
    this.selectedUser = null;
  }

  // ── CRUD ───────────────────────────────────────────────────────────────────

  onUserSubmit(user: UserDTO): void {
    if (user.id) {
      this.updateUser(user);
    } else {
      this.createUser(user);
    }
  }

  getUsers(): void {
    this.userService.getUsers().subscribe({
      next: (users: UserDTO[]) => {
        this.users = users;
      },
      error: (error: any) => {
        console.error('Error fetching users:', error);
      },
    });
  }

  createUser(user: UserDTO): void {
    this.userService.createUser(user).subscribe({
      next: (created: UserDTO) => {
        this.users = [...this.users, created];
      },
      error: (error: any) => {
        console.error('Error creating user:', error);
      },
    });
  }

  updateUser(user: UserDTO): void {
    this.userService.updateUser(user).subscribe({
      next: (updated: UserDTO) => {
        this.users = this.users.map((u) => (u.id === updated.id ? updated : u));
      },
      error: (error: any) => {
        console.error('Error updating user:', error);
      },
    });
  }
}

import { Component, OnInit } from '@angular/core';
import { UserDTO } from '../../../dto/user/user.dto';
import { UserService } from '../../../services/user/user.service';
import { UserFormComponent } from './user-form/user-form.component';
import { Role } from '../../../enums/user/role.enums';
import { ClickOutsideDirective } from '../../../directives/click-outside.directive';
import { ToastService } from '../../../services/toast/toast.service';

@Component({
  selector: 'app-users',
  imports: [UserFormComponent, ClickOutsideDirective],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css',
})
export class UsersComponent implements OnInit {
  users: UserDTO[] = [];
  isPanelOpen: boolean = false;
  selectedUser: UserDTO | null = null;
  openMenuUserId: number | null = null;

  constructor(
    private userService: UserService,
    private toastService: ToastService,
  ) {}

  ngOnInit(): void {
    this.getUsers();
  }

  get activeCount(): number {
    return this.users.filter((u) => u.active).length;
  }

  get adminCount(): number {
    return this.users.filter(
      (u) => u.role === Role.ADMIN || u.role === Role.SUPER_ADMIN,
    ).length;
  }

  roleLabel(role: string): string {
    const labels: Record<string, string> = {
      [Role.SUPER_ADMIN]: 'Super Admin',
      [Role.ADMIN]: 'Admin',
      [Role.USER]: 'User',
    };
    return labels[role] ?? role;
  }

  // ── Kebab Menu ─────────────────────────────────────────────────────────────

  toggleMenu(userId: number): void {
    this.openMenuUserId = this.openMenuUserId === userId ? null : userId;
  }

  closeMenu(): void {
    this.openMenuUserId = null;
  }

  onEditClick(user: UserDTO): void {
    this.closeMenu();
    this.openEditPanel(user);
  }

  onDeleteClick(user: UserDTO): void {
    this.closeMenu();
    this.deleteUser(user.id);
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
        this.onPanelClose();
        this.toastService.success('User created successfully.');
      },
      error: (error: any) => {
        console.error('Error creating user:', error);
        this.toastService.error('Unable to create user. Please try again.');
      },
    });
  }

  updateUser(user: UserDTO): void {
    this.userService.updateUser(user).subscribe({
      next: (updated: UserDTO) => {
        this.users = this.users.map((u) => (u.id === updated.id ? updated : u));
        this.onPanelClose();
        this.toastService.success('User updated successfully.');
      },
      error: (error: any) => {
        console.error('Error updating user:', error);
        this.toastService.error('Unable to update user. Please try again.');
      },
    });
  }

  deleteUser(id: number): void {
    this.userService.deleteUser(id).subscribe({
      next: () => {
        this.users = this.users.filter((u) => u.id !== id);
      },
      error: (error: any) => {
        console.error('Error deleting user:', error);
      },
    });
  }
}

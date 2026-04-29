import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UserDTO } from '../../../../dto/user/user.dto';
import { Role } from '../../../../enums/user/role.enums';

@Component({
  selector: 'app-user-form',
  imports: [FormsModule],
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.css',
})
export class UserFormComponent implements AfterViewInit, OnChanges {
  @Input() isSlideInPanelOpen: boolean = false;
  /** When set, the form is in edit mode. When null, it's create mode. */
  @Input() editUser: UserDTO | null = null;

  @Output() slideInPanelClose = new EventEmitter<void>();
  @Output() userSubmit = new EventEmitter<UserDTO>();

  formUser: UserDTO = new UserDTO();
  initialized = false;

  roles = [Role.ADMIN, Role.USER];

  get isEditMode(): boolean {
    return this.editUser !== null;
  }

  ngAfterViewInit() {
    setTimeout(() => (this.initialized = true), 0);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['editUser']) {
      if (this.editUser) {
        // Clone so edits don't mutate the parent's data directly
        this.formUser = { ...this.editUser };
      } else {
        this.formUser = new UserDTO();
      }
    }
  }

  closeSlideInPanel() {
    this.isSlideInPanelOpen = false;
    this.slideInPanelClose.emit();
  }

  submit() {
    if (!this.validate()) {
      return;
    }
    this.userSubmit.emit({ ...this.formUser });
    this.closeSlideInPanel();
  }

  private validate(): boolean {
    if (!this.formUser.name?.trim()) return false;
    if (!this.formUser.email?.trim()) return false;
    if (!this.formUser.role) return false;
    return true;
  }
}

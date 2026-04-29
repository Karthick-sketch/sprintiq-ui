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
import { ClickOutsideDirective } from '../../../directives/click-outside.directive';
import { ProjectDTO } from '../../../dto/project/project.dto';
import { UserDTO } from '../../../dto/user/user.dto';

@Component({
  selector: 'app-project-form',
  imports: [FormsModule, ClickOutsideDirective],
  templateUrl: './project-form.component.html',
  styleUrl: './project-form.component.css',
})
export class ProjectFormComponent implements AfterViewInit, OnChanges {
  @Input() isSlideInPanelOpen: boolean = true;
  @Input() users: UserDTO[] = [];

  @Output() projectSlideInPanel = new EventEmitter<boolean>();
  @Output() project = new EventEmitter<ProjectDTO>();

  newProject = new ProjectDTO();
  initialized = false;
  teamDropdownOpen = false;

  constructor() {}

  ngAfterViewInit() {
    // Enable transitions only after the initial render to prevent
    // the closing animation from playing when the page first loads.
    setTimeout(() => (this.initialized = true), 0);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (
      changes['isSlideInPanelOpen']?.currentValue &&
      !changes['isSlideInPanelOpen'].firstChange
    ) {
      this.newProject = new ProjectDTO();
      this.teamDropdownOpen = false;
    }
  }

  closeSlideInPanel() {
    this.isSlideInPanelOpen = false;
    this.projectSlideInPanel.emit(false);
  }

  sendProject() {
    if (!this.validateProject()) {
      return;
    }
    this.project.emit(this.newProject);
  }

  // ── Team Members multi-select helpers ──────────────────────────────────────

  selectedTeamMembers(): UserDTO[] {
    if (!this.newProject.teamMemberIds) return [];
    return this.users.filter((u) =>
      this.newProject.teamMemberIds!.includes(u.id),
    );
  }

  isTeamMemberSelected(id: number): boolean {
    return (this.newProject.teamMemberIds ?? []).includes(id);
  }

  toggleTeamMember(id: number): void {
    if (!this.newProject.teamMemberIds) {
      this.newProject.teamMemberIds = [];
    }
    const idx = this.newProject.teamMemberIds.indexOf(id);
    if (idx === -1) {
      this.newProject.teamMemberIds = [...this.newProject.teamMemberIds, id];
    } else {
      this.newProject.teamMemberIds = this.newProject.teamMemberIds.filter(
        (mid) => mid !== id,
      );
    }
  }

  removeTeamMember(event: MouseEvent, id: number): void {
    event.stopPropagation(); // prevent toggling the dropdown
    this.toggleTeamMember(id);
  }

  // ── Validation ─────────────────────────────────────────────────────────────

  private validateProject() {
    if (!this.newProject.title) {
      return false;
    }
    if (!this.newProject.description) {
      return false;
    }
    if (!this.newProject.ownerId) {
      return false;
    }
    if (!this.newProject.teamMemberIds?.length) {
      return false;
    }
    return true;
  }
}

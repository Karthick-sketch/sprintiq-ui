import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ProjectDTO } from '../../../dto/project/project.dto';

@Component({
  selector: 'app-project-form',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './project-form.component.html',
  styleUrl: './project-form.component.css',
})
export class ProjectFormComponent implements AfterViewInit {
  @Input() isSlideInPanelOpen: boolean = true;

  @Output() projectSlideInPanel = new EventEmitter<boolean>();
  @Output() project = new EventEmitter<ProjectDTO>();

  newProject = new ProjectDTO();
  initialized = false;

  constructor() {}

  ngAfterViewInit() {
    // Enable transitions only after the initial render to prevent
    // the closing animation from playing when the page first loads.
    setTimeout(() => (this.initialized = true), 0);
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

  private validateProject() {
    if (!this.newProject.name) {
      return false;
    }
    if (!this.newProject.description) {
      return false;
    }
    if (!this.newProject.ownerId) {
      return false;
    }
    if (!this.newProject.teamMemberIds) {
      return false;
    }
    return true;
  }
}

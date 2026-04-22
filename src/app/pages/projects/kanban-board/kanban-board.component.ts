import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Section } from '../../../models/projects/section.model';
import { SectionComponent } from './section/section.component';
import { ProjectService } from '../../../services/project/project.service';
import { UserDTO } from '../../../dto/user/user.dto';

@Component({
  selector: 'app-kanban-board',
  templateUrl: './kanban-board.component.html',
  styleUrls: ['./kanban-board.component.css'],
  imports: [SectionComponent, FormsModule],
})
export class KanbanBoardComponent {
  @Input() projectId!: number;
  @Input() users: UserDTO[] = [];

  sections: Section[] = [];
  isAddSectionClicked = false;
  newSection: Section = new Section();

  constructor(private projectService: ProjectService) {}

  ngOnInit(): void {
    this.getSections();
  }

  getSections() {
    this.projectService.getSections(this.projectId).subscribe((sections) => {
      this.sections = sections;
    });
  }

  enableAddSection() {
    this.isAddSectionClicked = true;
    this.newSection.name = `Section ${this.sections.length + 1}`;
  }

  closeAddSection() {
    this.isAddSectionClicked = false;
  }

  addSection() {
    if (!this.newSection.name) {
      alert('Please enter a section name');
      return;
    }
    this.newSection.projectId = this.projectId;
    this.projectService.createSection(this.newSection).subscribe((section) => {
      this.sections.push(section);
      this.closeAddSection();
    });
  }
}

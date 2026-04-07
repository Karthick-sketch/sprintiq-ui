import { Component, Input } from '@angular/core';
import { Section } from '../../../models/projects/section.model';
import { SectionComponent } from './section/section.component';

@Component({
  selector: 'app-kanban-board',
  templateUrl: './kanban-board.component.html',
  styleUrls: ['./kanban-board.component.css'],
  standalone: true,
  imports: [SectionComponent],
})
export class KanbanBoardComponent {
  @Input() projectId!: number;

  sections: Section[] = [];

  ngOnInit(): void {
    this.sections = [
      {
        id: 1,
        name: 'To do',
        projectId: this.projectId,
        tickets: [
          {
            id: 1,
            title: 'Ticket 3',
            description: 'Description 1',
            status: 'To do',
            priority: 'High',
            assignee: 'John Doe',
            dueDate: '2022-01-01',
            sectionId: 1,
            projectId: this.projectId,
          },
        ],
      },
      {
        id: 2,
        name: 'In Progress',
        projectId: this.projectId,
        tickets: [
          {
            id: 1,
            title: 'Ticket 2',
            description: 'Description 1',
            status: 'In Progress',
            priority: 'High',
            assignee: 'John Doe',
            dueDate: '2022-01-01',
            sectionId: 1,
            projectId: this.projectId,
          },
        ],
      },
      {
        id: 3,
        name: 'Done',
        projectId: this.projectId,
        tickets: [
          {
            id: 1,
            title: 'Ticket 1',
            description: 'Description 1',
            status: 'Done',
            priority: 'High',
            assignee: 'John Doe',
            dueDate: '2022-01-01',
            sectionId: 1,
            projectId: this.projectId,
          },
        ],
      },
    ];
  }

  addSection() {
    const section: Section = {
      id: this.sections.length + 1,
      name: `Section ${this.sections.length + 1}`,
      projectId: this.projectId,
      tickets: [],
    };
    this.sections.push(section);
  }
}

import { Component } from '@angular/core';
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
  sections: Section[] = [];
}

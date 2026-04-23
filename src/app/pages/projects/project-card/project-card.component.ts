import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Project } from '../../../models/projects/project.model';
import { IconComponent } from '../../icon/icon.component';

@Component({
  selector: 'app-project-card',
  templateUrl: './project-card.component.html',
  styleUrls: ['./project-card.component.css'],
  imports: [RouterLink, IconComponent],
})
export class ProjectCardComponent {
  @Input() project!: Project;
}

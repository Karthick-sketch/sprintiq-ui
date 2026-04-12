import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ProjectCardComponent } from './project-card/project-card.component';
import { ProjectFormComponent } from './project-form/project-form.component';
import { ProjectService } from '../../services/project/project.service';
import { Project } from '../../models/projects/project.model';
import { ProjectDTO } from '../../dto/project/project.dto';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css'],
  imports: [ProjectCardComponent, FormsModule, ProjectFormComponent],
})
export class ProjectsComponent implements OnInit {
  projects: Project[] = [];
  isSlideInPanelOpen: boolean = false;

  constructor(private projectService: ProjectService) {}

  ngOnInit(): void {
    this.getProjects();
  }

  openProjectSlideInPanel() {
    this.isSlideInPanelOpen = true;
  }

  closeProjectSlideInPanel() {
    this.isSlideInPanelOpen = false;
  }

  getProjects() {
    this.projectService.getProjects().subscribe((projects) => {
      this.projects = projects;
    });
  }

  createProject(newProject: ProjectDTO) {
    newProject.ownerId = Number(newProject.ownerId);
    newProject.teamMemberIds = [Number(newProject.teamMemberIds.toString())];
    this.projectService.createProject(newProject).subscribe((project) => {
      this.projects.push(project);
      this.closeProjectSlideInPanel();
    });
  }
}

import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ProjectCardComponent } from './project-card/project-card.component';
import { Project } from '../../models/projects/project.model';
import { ProjectService } from '../../services/project/project.service';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css'],
  imports: [ProjectCardComponent, FormsModule],
})
export class ProjectsComponent implements OnInit {
  projects: Project[] = [];

  newProject: Project = {
    id: 0,
    name: '',
    description: '',
    owner: '',
    teamMembers: [],
  };

  isSlideInPanelOpen: boolean = false;

  constructor(private projectService: ProjectService) {}

  ngOnInit(): void {
    this.getProjects();
  }

  getProjects() {
    this.projectService.getProjects().subscribe((projects) => {
      this.projects = projects;
    });
  }

  openProjectSlideInPanel() {
    this.isSlideInPanelOpen = true;
  }

  closeProjectSlideInPanel() {
    this.isSlideInPanelOpen = false;
  }

  createProject() {
    if (!this.validateProject()) {
      return;
    }

    this.projectService.createProject(this.newProject).subscribe((project) => {
      this.projects.push(project);
      this.closeProjectSlideInPanel();
    });
  }

  private validateProject() {
    if (!this.newProject.name) {
      return false;
    }
    if (!this.newProject.description) {
      return false;
    }
    if (!this.newProject.owner) {
      return false;
    }
    if (!this.newProject.teamMembers) {
      return false;
    }
    return true;
  }
}

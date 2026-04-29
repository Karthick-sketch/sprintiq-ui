import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ProjectCardComponent } from './project-card/project-card.component';
import { ProjectFormComponent } from './project-form/project-form.component';
import { ProjectService } from '../../services/project/project.service';
import { Project } from '../../models/projects/project.model';
import { ProjectDTO } from '../../dto/project/project.dto';
import { UserDTO } from '../../dto/user/user.dto';
import { UserService } from '../../services/user/user.service';
import { ToastService } from '../../services/toast/toast.service';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css'],
  imports: [ProjectCardComponent, FormsModule, ProjectFormComponent],
})
export class ProjectsComponent implements OnInit {
  projects: Project[] = [];
  users: UserDTO[] = [];
  isSlideInPanelOpen: boolean = false;

  constructor(
    private projectService: ProjectService,
    private userService: UserService,
    private toastService: ToastService,
  ) {}

  ngOnInit(): void {
    this.getProjects();
    this.getUsers();
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

  getUsers() {
    this.userService.getUsers().subscribe((users) => {
      this.users = users;
    });
  }

  createProject(newProject: ProjectDTO) {
    if (newProject.ownerId === null || newProject.teamMemberIds === null) {
      return;
    }

    this.projectService.createProject(newProject).subscribe({
      next: (project) => {
        this.projects.push(project);
        this.closeProjectSlideInPanel();
        this.toastService.success('Project created successfully.');
      },
      error: (error) => {
        console.error('Error creating project:', error);
        this.toastService.error('Unable to create project. Please try again.');
      },
    });
  }
}

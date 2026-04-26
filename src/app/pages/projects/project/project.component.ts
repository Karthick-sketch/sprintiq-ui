import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Project } from '../../../models/projects/project.model';
import { ProjectService } from '../../../services/project/project.service';
import { KanbanBoardComponent } from '../kanban-board/kanban-board.component';
import { BreadcrumbComponent } from '../../util/breadcrumb/breadcrumb.component';
import { UserService } from '../../../services/user/user.service';
import { UserDTO } from '../../../dto/user/user.dto';
import { BreadcrumbRouteDTO } from '../../../dto/util/breadcrump-route.dto';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css'],
  imports: [KanbanBoardComponent, BreadcrumbComponent],
})
export class ProjectComponent implements OnInit {
  project!: Project;
  users: UserDTO[] = [];
  breadcrumbRoutes: BreadcrumbRouteDTO[] = [
    {
      label: 'Projects',
      route: '/projects',
    },
  ];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private projectService: ProjectService,
    private userService: UserService,
  ) {}

  ngOnInit(): void {
    this.getProject();
    this.getUsers();
  }

  getProject() {
    const projectId = this.route.snapshot.paramMap.get('projectId');
    if (!projectId) {
      this.router.navigate(['/page-not-found']);
      return;
    }

    this.projectService.getProject(parseInt(projectId)).subscribe({
      next: (project) => {
        this.project = project;
        this.breadcrumbRoutes.push(
          new BreadcrumbRouteDTO(this.project.name, null),
        );
      },
      error: () => {
        this.router.navigate(['/page-not-found']);
      },
    });
  }

  getUsers() {
    this.userService.getUsers().subscribe((users) => {
      this.users = users;
    });
  }
}

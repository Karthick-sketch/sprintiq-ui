import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DatePipe, TitleCasePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { forkJoin } from 'rxjs';
import { Ticket } from '../../../models/ticket/ticket.model';
import { TicketService } from '../../../services/ticket/ticket.service';
import { ProjectService } from '../../../services/project/project.service';
import { UserService } from '../../../services/user/user.service';
import { UserDTO } from '../../../dto/user/user.dto';
import { BreadcrumbComponent } from '../../util/breadcrumb/breadcrumb.component';
import { BreadcrumbRouteDTO } from '../../../dto/util/breadcrump-route.dto';
import { UserIconComponent } from '../../user/user-icon/user-icon.component';
import { TicketFieldDTO } from '../../../dto/ticket/ticket-field.dto';
import { FieldType } from '../../../enums/fields/field-type.enums';
import { ToastService } from '../../../services/toast/toast.service';

@Component({
  selector: 'app-ticket',
  imports: [
    TitleCasePipe,
    DatePipe,
    FormsModule,
    BreadcrumbComponent,
    UserIconComponent,
  ],
  templateUrl: './ticket.component.html',
  styleUrl: './ticket.component.css',
})
export class TicketComponent implements OnInit {
  ticket!: Ticket;
  breadcrumbRoutes: BreadcrumbRouteDTO[] = [];
  users: UserDTO[] = [];
  ticketFields: TicketFieldDTO[] = [];

  FieldType = FieldType;

  constructor(
    private route: ActivatedRoute,
    private ticketService: TicketService,
    private projectService: ProjectService,
    private userService: UserService,
    private toastService: ToastService,
  ) {}

  ngOnInit(): void {
    const projectId = this.route.snapshot.paramMap.get('projectId');
    const ticketId = this.route.snapshot.paramMap.get('ticketId');

    this.userService.getUsers().subscribe((users) => {
      this.users = users;
    });

    if (projectId && ticketId) {
      forkJoin({
        project: this.projectService.getProject(parseInt(projectId)),
        ticket: this.ticketService.getTicket(parseInt(ticketId)),
      }).subscribe(({ project, ticket }) => {
        this.ticket = ticket;
        this.breadcrumbRoutes = [
          new BreadcrumbRouteDTO('Projects', '/projects'),
          new BreadcrumbRouteDTO(project.title, `/projects/${projectId}`),
          new BreadcrumbRouteDTO(ticket.title, null),
        ];
      });
    } else if (ticketId) {
      this.ticketService.getTicket(parseInt(ticketId)).subscribe((ticket) => {
        this.ticket = ticket;
        this.breadcrumbRoutes = [
          new BreadcrumbRouteDTO('Tickets', '/tickets'),
          new BreadcrumbRouteDTO(ticket.title, null),
        ];
      });
    }
  }

  // ── Helpers ──────────────────────────────────────────────────────────────

  findUsernameById(id: number | string | null): string {
    if (!id) return '<unassigned>';
    const user = this.users.find((u) => u.id.toString() === id.toString());
    if (!user) {
      this.toastService.error('User not found');
      return '<unknown>';
    }
    return user.name;
  }

  formatDueDateForInput(dateStr: string | null): string {
    if (!dateStr) return '';
    return dateStr.substring(0, 10); // 'YYYY-MM-DD'
  }
}

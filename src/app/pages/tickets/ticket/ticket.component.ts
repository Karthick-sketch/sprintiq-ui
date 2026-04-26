import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { forkJoin } from 'rxjs';
import { DatePipe, NgClass, TitleCasePipe } from '@angular/common';
import { Ticket } from '../../../models/ticket/ticket.model';
import { TicketService } from '../../../services/ticket/ticket.service';
import { ProjectService } from '../../../services/project/project.service';
import { BreadcrumbComponent } from '../../util/breadcrumb/breadcrumb.component';
import { BreadcrumbRouteDTO } from '../../../dto/util/breadcrump-route.dto';

@Component({
  selector: 'app-ticket',
  imports: [NgClass, TitleCasePipe, DatePipe, BreadcrumbComponent],
  templateUrl: './ticket.component.html',
  styleUrl: './ticket.component.css',
})
export class TicketComponent {
  ticket!: Ticket;
  breadcrumbRoutes: BreadcrumbRouteDTO[] = [];

  constructor(
    private route: ActivatedRoute,
    private ticketService: TicketService,
    private projectService: ProjectService,
  ) {}

  ngOnInit(): void {
    const projectId = this.route.snapshot.paramMap.get('projectId');
    const ticketId = this.route.snapshot.paramMap.get('ticketId');

    if (projectId && ticketId) {
      forkJoin({
        project: this.projectService.getProject(parseInt(projectId)),
        ticket: this.ticketService.getTicket(parseInt(ticketId)),
      }).subscribe(({ project, ticket }) => {
        this.ticket = ticket;
        this.breadcrumbRoutes = [
          new BreadcrumbRouteDTO('Projects', '/projects'),
          new BreadcrumbRouteDTO(project.name, `/projects/${projectId}`),
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
}

import { Component, OnInit } from '@angular/core';
import { NgClass, TitleCasePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { TicketService } from '../../services/ticket/ticket.service';
import { ProjectService } from '../../services/project/project.service';
import { TicketFormComponent } from './ticket-form/ticket-form.component';
import { Ticket } from '../../models/ticket/ticket.model';
import { Project } from '../../models/projects/project.model';
import { TicketListingDTO } from '../../dto/ticket/ticket-listing.dto';
import { TicketFilter } from '../../filter/ticket/ticket.filter';

@Component({
  selector: 'app-ticket',
  imports: [
    NgClass,
    TitleCasePipe,
    RouterLink,
    FormsModule,
    TicketFormComponent,
  ],
  templateUrl: './tickets.component.html',
  styleUrls: ['./tickets.component.css'],
})
export class TicketsComponent implements OnInit {
  tickets: TicketListingDTO[] = [];
  filteredTickets: TicketListingDTO[] = [];

  // Filter state
  ticketFilter: TicketFilter = new TicketFilter();

  // Filter options
  statusOptions = [
    { value: 'TODO', label: 'To Do' },
    { value: 'IN_PROGRESS', label: 'In Progress' },
    { value: 'DONE', label: 'Done' },
  ];

  priorityOptions = [
    { value: 'LOW', label: 'Low' },
    { value: 'MEDIUM', label: 'Medium' },
    { value: 'HIGH', label: 'High' },
    { value: 'URGENT', label: 'Urgent' },
  ];

  assigneeOptions: number[] = [];
  projectOptions: Project[] = [];

  isSlideInPanelOpen: boolean = false;

  constructor(
    private ticketService: TicketService,
    private projectService: ProjectService,
  ) {}

  ngOnInit(): void {
    this.getTickets();
    this.getProjects();
  }

  getTickets() {
    this.ticketService.getTickets().subscribe((tickets) => {
      this.tickets = tickets;
      this.filteredTickets = tickets;

      // Extract unique assignee IDs for the filter dropdown
      this.assigneeOptions = [
        ...new Set(tickets.map((t) => t.assigneeId)),
      ].sort((a, b) => a - b);
    });
  }

  getProjects() {
    this.projectService.getProjects().subscribe((projects) => {
      this.projectOptions = projects;
    });
  }

  applyFilters() {
    const params = new URLSearchParams();
    if (this.ticketFilter.search) {
      params.append('search', this.ticketFilter.search);
    }
    if (this.ticketFilter.status) {
      params.append('status', this.ticketFilter.status);
    }
    if (this.ticketFilter.priority) {
      params.append('priority', this.ticketFilter.priority);
    }
    if (this.ticketFilter.assignee) {
      params.append('assigneeId', this.ticketFilter.assignee.toString());
    }
    if (this.ticketFilter.project) {
      params.append('projectId', this.ticketFilter.project.toString());
    }

    const queryString = params.toString() ? `?${params.toString()}` : '';

    this.ticketService.getTickets(queryString).subscribe((tickets) => {
      this.filteredTickets = tickets;
    });
  }

  openTicketSlideInPanel() {
    this.isSlideInPanelOpen = true;
  }

  closeTicketSlideInPanel() {
    this.isSlideInPanelOpen = false;
  }

  addTicket(ticket: Ticket) {
    ticket.assigneeId = Number(ticket.assigneeId);
    this.ticketService.createTicket(ticket).subscribe(() => {
      this.closeTicketSlideInPanel();
      this.getTickets();
    });
  }
}

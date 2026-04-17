import { Component, OnInit } from '@angular/core';
import { NgClass, TitleCasePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { TicketService } from '../../services/ticket/ticket.service';
import { ProjectService } from '../../services/project/project.service';
import { TicketListingDTO } from '../../dto/ticket/ticket-listing.dto';
import { Project } from '../../models/projects/project.model';

@Component({
  selector: 'app-ticket',
  imports: [NgClass, TitleCasePipe, RouterLink, FormsModule],
  templateUrl: './tickets.component.html',
  styleUrls: ['./tickets.component.css'],
})
export class TicketsComponent implements OnInit {
  tickets: TicketListingDTO[] = [];
  filteredTickets: TicketListingDTO[] = [];

  // Filter state
  searchTerm = '';
  selectedStatus = '';
  selectedPriority = '';
  selectedAssignee = '';
  selectedProject = '';

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
    this.filteredTickets = this.tickets.filter((ticket) => {
      // Search term filter (matches title)
      const matchesSearch =
        !this.searchTerm ||
        ticket.title.toLowerCase().includes(this.searchTerm.toLowerCase());

      // Status filter
      const matchesStatus =
        !this.selectedStatus || ticket.status === this.selectedStatus;

      // Priority filter
      const matchesPriority =
        !this.selectedPriority || ticket.priority === this.selectedPriority;

      // Assignee filter
      const matchesAssignee =
        !this.selectedAssignee ||
        ticket.assigneeId === Number(this.selectedAssignee);

      // Project filter
      const matchesProject =
        !this.selectedProject ||
        ticket.projectId === Number(this.selectedProject);

      return (
        matchesSearch &&
        matchesStatus &&
        matchesPriority &&
        matchesAssignee &&
        matchesProject
      );
    });
  }
}

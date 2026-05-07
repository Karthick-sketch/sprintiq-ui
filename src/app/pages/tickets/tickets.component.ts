import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { TicketService } from '../../services/ticket/ticket.service';
import { ProjectService } from '../../services/project/project.service';
import { TicketFormComponent } from './ticket-form/ticket-form.component';
import { Project } from '../../models/projects/project.model';
import { TicketListingDTO } from '../../dto/ticket/ticket-listing.dto';
import { TicketFilter } from '../../filter/ticket/ticket.filter';
import { TicketCreateRequestDTO } from '../../dto/ticket/ticket.dto';
import { UserIconComponent } from '../user/user-icon/user-icon.component';
import { ToastService } from '../../services/toast/toast.service';
import { UserDTO } from '../../dto/user/user.dto';
import { UserService } from '../../services/user/user.service';
import { FieldOptionDTO } from '../../dto/field/field.dto';
import { FieldOptionColors } from '../../objects/field/field-option-color.enums';
import { TicketFieldDTO } from '../../dto/ticket/ticket-field.dto';
import { FieldService } from '../../services/field/field.service';

@Component({
  selector: 'app-ticket',
  imports: [RouterLink, FormsModule, TicketFormComponent, UserIconComponent],
  templateUrl: './tickets.component.html',
  styleUrls: ['./tickets.component.css'],
})
export class TicketsComponent implements OnInit {
  tickets: TicketListingDTO[] = [];
  users: UserDTO[] = [];
  filteredTickets: TicketListingDTO[] = [];
  projectOptions: Project[] = [];
  fieldOptions: FieldOptionDTO[] = [];

  fieldOptionColor = FieldOptionColors;

  isSlideInPanelOpen: boolean = false;

  // Filter state
  ticketFilter: TicketFilter = new TicketFilter();

  statusOptions: FieldOptionDTO[] = [];
  priorityOptions: FieldOptionDTO[] = [];

  constructor(
    private userService: UserService,
    private ticketService: TicketService,
    private projectService: ProjectService,
    private toastService: ToastService,
    private fieldService: FieldService,
  ) {}

  ngOnInit(): void {
    this.setFilterOptions();
    this.getUsers();
    this.getTickets();
    this.getProjects();
  }

  setFilterOptions() {
    const statusFieldId = this.fieldOptions.find(
      (option) => option.field.name.toLowerCase() === 'status',
    )?.id;
    this.statusOptions = this.getFieldOptions(statusFieldId!);

    const priorityFieldId = this.fieldOptions.find(
      (option) => option.field.name.toLowerCase() === 'priority',
    )?.id;
    this.priorityOptions = this.getFieldOptions(priorityFieldId!);
  }

  getFieldOptions(fieldId: number): FieldOptionDTO[] {
    let options: FieldOptionDTO[] = [];
    this.fieldService
      .getFieldOptionsByFieldId(fieldId)
      .subscribe((opts) => (options = opts));
    return options;
  }

  getUsers() {
    this.userService.getUsers().subscribe((users) => {
      this.users = users;
    });
  }

  getTickets() {
    this.ticketService.getTickets().subscribe((tickets) => {
      this.tickets = tickets;
      this.filteredTickets = tickets;
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
    if (this.ticketFilter.assigneeId) {
      params.append('assigneeId', this.ticketFilter.assigneeId.toString());
    }
    if (this.ticketFilter.projectId) {
      params.append('projectId', this.ticketFilter.projectId.toString());
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

  addTicket(ticketRequest: TicketCreateRequestDTO) {
    this.ticketService.createTicket(ticketRequest).subscribe({
      next: () => {
        this.closeTicketSlideInPanel();
        this.getTickets();
        this.toastService.success('Ticket created successfully.');
      },
      error: (error) => {
        console.error('Error creating ticket:', error);
        this.toastService.error('Unable to create ticket. Please try again.');
      },
    });
  }

  getPriority(ticketFields: TicketFieldDTO[]) {
    const ticketField = ticketFields.find((f) => f.field.name === 'priority');
    if (ticketField?.value) {
      return ticketField.value.replace('_', ' ');
    }
    return '';
  }

  getUserIcon(name: string) {
    if (!name) {
      return '';
    }
    const names = name.split(' ');
    if (names.length > 1) {
      return (
        names[0].charAt(0).toUpperCase() + names[1].charAt(0).toUpperCase()
      );
    }
    return name.charAt(0).toUpperCase() + name.charAt(1).toUpperCase();
  }

  findOptionColorClass(fieldId: number, fieldValue: string): string {
    const option = this.fieldOptions.find(
      (opt) => opt.fieldId === fieldId && opt.value === fieldValue,
    );

    if (!option) return '';

    const color = this.fieldOptionColor.find(
      (color) => color.colorNumber === option.colorNumber,
    );
    return color?.colorClass || '';
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    const daysDiff = this.getDateDiff(dateString);

    if (daysDiff === 0) {
      return 'Today';
    } else if (daysDiff === 1) {
      return 'Tomorrow';
    } else if (daysDiff === -1) {
      return 'Yesterday';
    }
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  }

  isOverdue(dateString: string): boolean {
    return this.getDateDiff(dateString) < 0;
  }

  private getDateDiff(dateString: string): number {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const date = new Date(dateString);
    date.setHours(0, 0, 0, 0);

    const timeDiff = date.getTime() - today.getTime();
    const daysDiff = Math.round(timeDiff / 86400000);

    return daysDiff;
  }
}

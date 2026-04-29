import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DropdownDTO } from '../../../dto/util/dropdown.dto';
import { TicketPriority } from '../../../enums/ticket/ticket-priority.enums';
import { TicketStatus } from '../../../enums/ticket/ticket-status.enums';
import { TicketCreateRequestDTO } from '../../../dto/ticket/ticket.dto';
import { ProjectDTO } from '../../../dto/project/project.dto';
import { SectionDTO } from '../../../dto/project/section.dto';
import { UserDTO } from '../../../dto/user/user.dto';

@Component({
  selector: 'app-ticket-form',
  templateUrl: './ticket-form.component.html',
  styleUrls: ['./ticket-form.component.css'],
  imports: [FormsModule],
})
export class TicketFormComponent implements AfterViewInit, OnChanges {
  @Input() users: UserDTO[] = [];
  @Input() isSlideInPanelOpen: boolean = true;
  @Input() isInProject: boolean = false;
  @Input() projects: ProjectDTO[] = [];

  @Output() ticketSlideInPanel = new EventEmitter<void>();
  @Output() ticketEvent = new EventEmitter<TicketCreateRequestDTO>();

  ticket = new TicketCreateRequestDTO();
  sections: SectionDTO[] | null = null;

  ticketStatus = [
    new DropdownDTO('To Do', TicketStatus.TODO),
    new DropdownDTO('In Progress', TicketStatus.IN_PROGRESS),
    new DropdownDTO('Done', TicketStatus.DONE),
  ];
  ticketPriority = [
    new DropdownDTO('Low', TicketPriority.LOW),
    new DropdownDTO('Medium', TicketPriority.MEDIUM),
    new DropdownDTO('High', TicketPriority.HIGH),
    new DropdownDTO('Urgent', TicketPriority.URGENT),
  ];

  initialized = false;

  ngAfterViewInit() {
    setTimeout(() => (this.initialized = true), 0);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (
      changes['isSlideInPanelOpen']?.currentValue &&
      !changes['isSlideInPanelOpen'].firstChange
    ) {
      this.ticket = new TicketCreateRequestDTO();
    }
  }

  closeSlideInPanel() {
    this.isSlideInPanelOpen = false;
    this.ticket = new TicketCreateRequestDTO();
    this.ticketSlideInPanel.emit();
  }

  addTicket() {
    if (!this.validateTicket()) {
      return;
    }
    this.ticketEvent.emit(this.ticket);
  }

  private validateTicket() {
    if (!this.ticket.title) {
      return false;
    }
    if (!this.ticket.description) {
      return false;
    }
    if (!this.ticket.status) {
      return false;
    }
    if (!this.ticket.priority) {
      return false;
    }
    if (!this.ticket.assigneeId || this.ticket.assigneeId == 0) {
      return false;
    }
    if (!this.ticket.dueDate) {
      return false;
    }
    return true;
  }
}

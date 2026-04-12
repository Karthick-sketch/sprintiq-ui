import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DropdownDTO } from '../../../dto/common/dropdown.dto';
import { TicketPriority } from '../../../enums/ticket/ticket-priority.enums';
import { TicketStatus } from '../../../enums/ticket/ticket-status.enums';
import { TicketDTO } from '../../../dto/ticket/ticket.dto';

@Component({
  selector: 'app-ticket-form',
  templateUrl: './ticket-form.component.html',
  styleUrls: ['./ticket-form.component.css'],
  imports: [FormsModule],
})
export class TicketFormComponent implements AfterViewInit {
  @Input() isSlideInPanelOpen: boolean = true;

  @Output() ticketSlideInPanel = new EventEmitter<boolean>();
  @Output() ticketEvent = new EventEmitter<TicketDTO>();

  ticket = new TicketDTO();

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

  closeSlideInPanel() {
    this.isSlideInPanelOpen = false;
    this.ticketSlideInPanel.emit(false);
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
    if (!this.ticket.assigneeId) {
      return false;
    }
    if (!this.ticket.dueDate) {
      return false;
    }
    return true;
  }
}

import { Component, Input } from '@angular/core';
import { DatePipe } from '@angular/common';
import { TicketDTO } from '../../../../../dto/ticket/ticket.dto';
import { TicketStatus } from '../../../../../enums/ticket/ticket-status.enums';
import { TicketPriority } from '../../../../../enums/ticket/ticket-priority.enums';

@Component({
  selector: 'app-section-ticket',
  templateUrl: './section-ticket.component.html',
  styleUrls: ['./section-ticket.component.css'],
  imports: [DatePipe],
})
export class SectionTicketComponent {
  @Input() ticket!: TicketDTO;

  getStatus(status: TicketStatus) {
    switch (status) {
      case TicketStatus.TODO:
        return 'To Do';
      case TicketStatus.IN_PROGRESS:
        return 'In Progress';
      case TicketStatus.DONE:
        return 'Done';
    }
    return '';
  }

  getPriority(priority: TicketPriority) {
    switch (priority) {
      case TicketPriority.LOW:
        return 'Low';
      case TicketPriority.MEDIUM:
        return 'Medium';
      case TicketPriority.HIGH:
        return 'High';
      case TicketPriority.URGENT:
        return 'Urgent';
    }
    return '';
  }
}

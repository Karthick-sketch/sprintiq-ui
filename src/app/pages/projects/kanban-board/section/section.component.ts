import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SectionTicketComponent } from './section-ticket/section-ticket.component';
import { TicketService } from '../../../../services/ticket/ticket.service';
import { Section } from '../../../../models/projects/section.model';
import { TicketDTO } from '../../../../dto/ticket/ticket.dto';
import { DropdownDTO } from '../../../../dto/common/dropdown.dto';
import { TicketPriority } from '../../../../enums/ticket/ticket-priority.enums';
import { TicketStatus } from '../../../../enums/ticket/ticket-status.enums';

@Component({
  selector: 'app-section',
  templateUrl: './section.component.html',
  styleUrls: ['./section.component.css'],
  standalone: true,
  imports: [SectionTicketComponent, FormsModule],
})
export class SectionComponent {
  @Input() section!: Section;

  ticket = new TicketDTO();
  isSlideInPanelOpen: boolean = false;

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

  constructor(private ticketService: TicketService) {}

  openTicketSlideInPanel() {
    this.ticket = new TicketDTO();
    this.isSlideInPanelOpen = true;
  }

  closeTicketSlideInPanel() {
    this.isSlideInPanelOpen = false;
  }

  addTicket() {
    if (!this.validateTicket()) {
      console.log(this.ticket);
      alert('Please fill all the fields');
      return;
    }
    this.ticket.assigneeId = Number(this.ticket.assigneeId);
    this.ticket.sectionId = this.section.id;
    this.ticket.projectId = this.section.projectId;
    this.ticketService.createTicket(this.ticket).subscribe((ticket) => {
      this.section.tickets.push(ticket);
      this.closeTicketSlideInPanel();
    });
  }

  validateTicket() {
    return (
      this.ticket.title &&
      this.ticket.description &&
      this.ticket.status &&
      this.ticket.priority &&
      this.ticket.assigneeId &&
      this.ticket.dueDate
    );
  }
}

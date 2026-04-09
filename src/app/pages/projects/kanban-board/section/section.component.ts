import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SectionTicketComponent } from './section-ticket/section-ticket.component';
import { Section } from '../../../../models/projects/section.model';
import { TicketService } from '../../../../services/ticket/ticket.service';
import { TicketDTO } from '../../../../dto/ticket/ticket.dto';

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

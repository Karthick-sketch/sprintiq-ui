import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SectionTicketComponent } from './section-ticket/section-ticket.component';
import { TicketFormComponent } from '../../../tickets/ticket-form/ticket-form.component';
import { TicketService } from '../../../../services/ticket/ticket.service';
import { Section } from '../../../../models/projects/section.model';
import { TicketDTO } from '../../../../dto/ticket/ticket.dto';
import { UserDTO } from '../../../../dto/user/user.dto';

@Component({
  selector: 'app-section',
  templateUrl: './section.component.html',
  styleUrls: ['./section.component.css'],
  imports: [SectionTicketComponent, FormsModule, TicketFormComponent],
})
export class SectionComponent {
  @Input() section!: Section;
  @Input() users: UserDTO[] = [];

  isSlideInPanelOpen: boolean = false;

  constructor(private ticketService: TicketService) {}

  openTicketSlideInPanel() {
    this.isSlideInPanelOpen = true;
  }

  closeTicketSlideInPanel() {
    this.isSlideInPanelOpen = false;
  }

  addTicket(ticket: TicketDTO) {
    ticket.assigneeId = Number(ticket.assigneeId);
    ticket.sectionId = this.section.id;
    ticket.projectId = this.section.projectId;
    this.ticketService.createTicket(ticket).subscribe((ticket) => {
      this.section.tickets.push(ticket);
      this.closeTicketSlideInPanel();
    });
  }
}

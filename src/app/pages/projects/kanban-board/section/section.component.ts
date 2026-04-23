import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  CdkDrag,
  CdkDragDrop,
  CdkDropList,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { SectionTicketComponent } from './section-ticket/section-ticket.component';
import { TicketFormComponent } from '../../../tickets/ticket-form/ticket-form.component';
import { TicketService } from '../../../../services/ticket/ticket.service';
import { Section } from '../../../../models/projects/section.model';
import { TicketDTO, TicketRequestDTO } from '../../../../dto/ticket/ticket.dto';
import { TicketOrderDTO } from '../../../../dto/ticket/ticket-order.dto';
import { UserDTO } from '../../../../dto/user/user.dto';

@Component({
  selector: 'app-section',
  templateUrl: './section.component.html',
  styleUrls: ['./section.component.css'],
  imports: [
    CdkDrag,
    CdkDropList,
    SectionTicketComponent,
    FormsModule,
    TicketFormComponent,
  ],
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

  addTicket(ticket: TicketRequestDTO) {
    ticket.sectionId = this.section.id;
    ticket.projectId = this.section.projectId;
    this.ticketService.createTicket(ticket).subscribe((ticket) => {
      this.section.tickets.push(ticket);
      this.closeTicketSlideInPanel();
    });
  }

  getLength(): number {
    if (this.section.tickets) {
      return this.section.tickets.length;
    }
    return 0;
  }

  dropTicket(event: CdkDragDrop<TicketDTO[]>) {
    if (event.previousContainer === event.container) {
      // ticket moved within same section
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
      // reorder tickets in the same section
      this.reorderTickets(this.section.id, event.container.data);
    } else {
      // ticket moved to a different section
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
      const tickets = event.container.data;
      // reorder tickets in this section
      this.reorderTickets(this.section.id, tickets);
      // find previous section id by added ticket to this section
      const addedTicket = tickets.find(
        (ticket) => ticket.sectionId !== this.section.id,
      );
      // reorder tickets in previous section
      this.reorderTickets(addedTicket!.sectionId, event.previousContainer.data);
    }
  }

  /**
   * Reorders the tickets in the section.
   * @param sectionId - The ID of the section.
   * @param tickets - The list of tickets to reorder.
   */
  private reorderTickets(sectionId: number, tickets: TicketDTO[]) {
    if (!tickets || tickets.length === 0) {
      return;
    }

    const ticketOrderDTOs: TicketOrderDTO[] = [];
    tickets.forEach((ticket, index) => {
      ticketOrderDTOs.push(new TicketOrderDTO(ticket.id, index));
    });

    this.ticketService.reorderTickets(sectionId, ticketOrderDTOs).subscribe({
      next: () => {},
      error: (error) => {
        console.error('Error reordering ticket:', error);
      },
    });
  }
}

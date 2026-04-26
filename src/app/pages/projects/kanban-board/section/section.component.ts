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
import { ProjectDTO } from '../../../../dto/project/project.dto';

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
  @Input() project!: ProjectDTO;

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
    ticket.orderIndex = this.section.tickets.length;

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
      // ticket moved within same section — reorder in place
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
      this.reorderTickets(this.section.id, event.container.data);
    } else {
      // Capture the previous section id BEFORE mutating the arrays,
      // because the ticket's sectionId may be stale after prior moves.
      // The previousContainer's id is set to the section id via [id] binding.
      const previousSectionId = Number(event.previousContainer.id);

      // Move ticket between sections
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );

      // Update the moved ticket's sectionId to reflect its new home
      const movedTicket = event.container.data[event.currentIndex];
      if (movedTicket) {
        movedTicket.sectionId = this.section.id;
      }

      // Reorder tickets in both sections
      this.reorderTickets(this.section.id, event.container.data);
      this.reorderTickets(previousSectionId, event.previousContainer.data);
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

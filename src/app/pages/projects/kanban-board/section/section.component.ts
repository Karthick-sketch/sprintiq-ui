import { Component, Input } from '@angular/core';
import { SectionTicketComponent } from './section-ticket/section-ticket.component';
import { Section } from '../../../../models/projects/section.model';
import { Ticket } from '../../../../models/ticket/ticket.model';

@Component({
  selector: 'app-section',
  templateUrl: './section.component.html',
  styleUrls: ['./section.component.css'],
  standalone: true,
  imports: [SectionTicketComponent],
})
export class SectionComponent {
  @Input() section!: Section;

  isSlideInPanelOpen: boolean = false;

  openTicketSlideInPanel() {
    this.isSlideInPanelOpen = true;
  }

  closeTicketSlideInPanel() {
    this.isSlideInPanelOpen = false;
  }

  addTicket() {
    const ticket: Ticket = {
      id: this.section.tickets.length + 1,
      title: `Ticket ${this.section.tickets.length + 1}`,
      description: `Description ${this.section.tickets.length + 1}`,
      status: this.section.name,
      priority: 'High',
      assignee: 'John Doe',
      dueDate: '2022-01-01',
      sectionId: this.section.id,
      projectId: this.section.projectId,
    };
    this.section.tickets.push(ticket);
  }
}

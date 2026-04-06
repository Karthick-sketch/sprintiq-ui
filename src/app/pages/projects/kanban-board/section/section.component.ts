import { Component } from '@angular/core';
import { SectionTicketComponent } from './section-ticket/section-ticket.component';
import { TicketDTO } from '../../../../dto/ticket/ticket.dto';

@Component({
  selector: 'app-section',
  templateUrl: './section.component.html',
  styleUrls: ['./section.component.css'],
  standalone: true,
  imports: [SectionTicketComponent],
})
export class SectionComponent {
  tickets: TicketDTO[] = [];
}

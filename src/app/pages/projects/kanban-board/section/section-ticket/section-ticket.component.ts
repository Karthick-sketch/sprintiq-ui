import { Component, Input } from '@angular/core';
import { TicketDTO } from '../../../../../dto/ticket/ticket.dto';

@Component({
  selector: 'app-section-ticket',
  templateUrl: './section-ticket.component.html',
  styleUrls: ['./section-ticket.component.css'],
  standalone: true,
})
export class SectionTicketComponent {
  @Input() ticket!: TicketDTO;
}

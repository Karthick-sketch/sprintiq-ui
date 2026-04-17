import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DatePipe, NgClass, TitleCasePipe } from '@angular/common';
import { Ticket } from '../../../models/ticket/ticket.model';
import { TicketService } from '../../../services/ticket/ticket.service';

@Component({
  selector: 'app-ticket',
  imports: [NgClass, TitleCasePipe, DatePipe],
  templateUrl: './ticket.component.html',
  styleUrl: './ticket.component.css',
})
export class TicketComponent {
  ticket!: Ticket;

  constructor(
    private route: ActivatedRoute,
    private ticketService: TicketService,
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.getTicket(parseInt(id));
    }
  }

  getTicket(id: number) {
    this.ticketService.getTicket(id).subscribe((ticket) => {
      this.ticket = ticket;
    });
  }
}

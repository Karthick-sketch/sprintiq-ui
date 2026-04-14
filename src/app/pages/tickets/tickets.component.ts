import { Component, OnInit } from '@angular/core';
import { NgClass, TitleCasePipe } from '@angular/common';
import { TicketService } from '../../services/ticket/ticket.service';
import { TicketListingDTO } from '../../dto/ticket/ticket-listing.dto';

@Component({
  selector: 'app-ticket',
  standalone: true,
  imports: [NgClass, TitleCasePipe],
  templateUrl: './tickets.component.html',
  styleUrls: ['./tickets.component.css'],
})
export class TicketsComponent implements OnInit {
  tickets: TicketListingDTO[] = [];

  constructor(private ticketService: TicketService) {}

  ngOnInit(): void {
    this.getTickets();
  }

  getTickets() {
    this.ticketService.getTickets().subscribe((tickets) => {
      this.tickets = tickets;
    });
  }
}

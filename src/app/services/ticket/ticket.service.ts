import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Ticket } from '../../models/ticket/ticket.model';
import { TicketDTO } from '../../dto/ticket/ticket.dto';
import { TicketListingDTO } from '../../dto/ticket/ticket-listing.dto';

@Injectable({
  providedIn: 'root',
})
export class TicketService {
  private baseUrl = '/api/tickets';

  constructor(private http: HttpClient) {}

  getTickets() {
    return this.http.get<TicketListingDTO[]>(this.baseUrl);
  }

  getTicket(id: number) {
    return this.http.get<Ticket>(`${this.baseUrl}/${id}`);
  }

  createTicket(ticketDTO: TicketDTO) {
    return this.http.post<TicketDTO>(this.baseUrl, ticketDTO);
  }

  updateTicket(ticket: Ticket) {
    return this.http.put<Ticket>(`${this.baseUrl}/${ticket.id}`, ticket);
  }

  deleteTicket(id: number) {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}

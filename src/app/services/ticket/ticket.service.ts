import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Ticket } from '../../models/ticket/ticket.model';
import { TicketDTO, TicketRequestDTO } from '../../dto/ticket/ticket.dto';
import { TicketListingDTO } from '../../dto/ticket/ticket-listing.dto';
import { TicketOrderDTO } from '../../dto/ticket/ticket-order.dto';

@Injectable({
  providedIn: 'root',
})
export class TicketService {
  private baseUrl = '/api/tickets';

  constructor(private http: HttpClient) {}

  getTickets(queryString: string = '') {
    return this.http.get<TicketListingDTO[]>(`${this.baseUrl}${queryString}`);
  }

  getTicket(id: number) {
    return this.http.get<Ticket>(`${this.baseUrl}/${id}`);
  }

  createTicket(ticketRequestDTO: TicketRequestDTO) {
    return this.http.post<TicketDTO>(this.baseUrl, ticketRequestDTO);
  }

  updateTicket(ticket: Ticket) {
    return this.http.put<Ticket>(`${this.baseUrl}/${ticket.id}`, ticket);
  }

  deleteTicket(id: number) {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }

  reorderTickets(sectionId: number, ticketOrderDTO: TicketOrderDTO[]) {
    return this.http.put<void>(
      `${this.baseUrl}/section/${sectionId}/reorder`,
      ticketOrderDTO,
    );
  }
}

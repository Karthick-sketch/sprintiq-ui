import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  TicketFieldValue,
  TicketFieldValueRequest,
  TicketSearchRequest,
  PagedResponse,
} from '../models/field.models';
import { TicketListingDTO } from '../../dto/ticket/ticket-listing.dto';

@Injectable({ providedIn: 'root' })
export class TicketFieldValueService {
  constructor(private http: HttpClient) {}

  getFieldValues(ticketId: number): Observable<TicketFieldValue[]> {
    return this.http.get<TicketFieldValue[]>(
      `/api/tickets/${ticketId}/field-values`
    );
  }

  saveFieldValues(
    ticketId: number,
    requests: TicketFieldValueRequest[]
  ): Observable<TicketFieldValue[]> {
    return this.http.put<TicketFieldValue[]>(
      `/api/tickets/${ticketId}/field-values`,
      requests
    );
  }

  patchFieldValue(
    ticketId: number,
    projectFieldId: number,
    request: TicketFieldValueRequest
  ): Observable<TicketFieldValue> {
    return this.http.patch<TicketFieldValue>(
      `/api/tickets/${ticketId}/field-values/${projectFieldId}`,
      request
    );
  }

  searchTickets(
    request: TicketSearchRequest
  ): Observable<PagedResponse<TicketListingDTO>> {
    return this.http.post<PagedResponse<TicketListingDTO>>(
      '/api/tickets/search',
      request
    );
  }
}

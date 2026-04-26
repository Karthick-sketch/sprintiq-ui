import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DatePipe, NgClass, TitleCasePipe } from '@angular/common';
import { Ticket } from '../../../models/ticket/ticket.model';
import { TicketService } from '../../../services/ticket/ticket.service';
import { BreadcrumbComponent } from '../../util/breadcrumb/breadcrumb.component';
import { BreadcrumbRouteDTO } from '../../../dto/util/breadcrump-route.dto';

@Component({
  selector: 'app-ticket',
  imports: [NgClass, TitleCasePipe, DatePipe, BreadcrumbComponent],
  templateUrl: './ticket.component.html',
  styleUrl: './ticket.component.css',
})
export class TicketComponent {
  ticket!: Ticket;
  breadcrumbRoutes!: BreadcrumbRouteDTO[];

  constructor(
    private route: ActivatedRoute,
    private ticketService: TicketService,
  ) {}

  ngOnInit(): void {
    const state = this.route.snapshot.paramMap && history.state;
    if (state?.['breadcrumbRoutes']) {
      this.breadcrumbRoutes = state['breadcrumbRoutes'];
    }

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

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Ticket } from '../../../models/ticket/ticket.model';
import { TicketService } from '../../../services/ticket/ticket.service';
import { UserService } from '../../../services/user/user.service';
import { UserDTO } from '../../../dto/user/user.dto';
import { BreadcrumbComponent } from '../../util/breadcrumb/breadcrumb.component';
import { BreadcrumbRouteDTO } from '../../../dto/util/breadcrump-route.dto';
import { UserIconComponent } from '../../user/user-icon/user-icon.component';
import { TicketFieldDTO } from '../../../dto/ticket/ticket-field.dto';
import { FieldType } from '../../../enums/fields/field-type.enums';
import { ToastService } from '../../../services/toast/toast.service';
import { FieldOptionDTO } from '../../../dto/field/field.dto';
import { FieldService } from '../../../services/field/field.service';
import { FieldOptionColors } from '../../../objects/field/field-option-color.enums';

@Component({
  selector: 'app-ticket',
  imports: [
    DatePipe,
    FormsModule,
    BreadcrumbComponent,
    UserIconComponent,
    RouterLink,
  ],
  templateUrl: './ticket.component.html',
  styleUrl: './ticket.component.css',
})
export class TicketComponent implements OnInit {
  ticket!: Ticket;
  breadcrumbRoutes: BreadcrumbRouteDTO[] = [];
  users: UserDTO[] = [];
  ticketFields: TicketFieldDTO[] = [];
  fieldOptions: FieldOptionDTO[] = [];

  FieldType = FieldType;
  fieldOptionColor = FieldOptionColors;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private ticketService: TicketService,
    private fieldService: FieldService,
    private userService: UserService,
    private toastService: ToastService,
  ) {}

  ngOnInit(): void {
    const projectId = this.route.snapshot.paramMap.get('projectId');
    const ticketId = this.route.snapshot.paramMap.get('ticketId');

    if (!ticketId) {
      this.router.navigate(['/tickets']);
      return;
    }

    this.ticketService.getTicket(parseInt(ticketId)).subscribe({
      next: (ticket) => {
        this.ticket = ticket;

        // users
        this.userService.getUsers().subscribe((users) => {
          this.users = users;
        });

        // field options
        this.fieldService.getAllFieldOptions().subscribe((options) => {
          this.fieldOptions = options;
        });

        // breadcrumb
        if (projectId) {
          this.breadcrumbRoutes = [
            new BreadcrumbRouteDTO('Projects', '/projects'),
            new BreadcrumbRouteDTO(
              ticket.project.title,
              `/projects/${ticket.project.id}`,
            ),
            new BreadcrumbRouteDTO(ticket.title, null),
          ];
        } else {
          this.breadcrumbRoutes = [
            new BreadcrumbRouteDTO('Tickets', '/tickets'),
            new BreadcrumbRouteDTO(ticket.title, null),
          ];
        }
      },
      error: (err) => {
        this.toastService.error(err.error.message);
        this.router.navigate(['/tickets']);
      },
    });
  }

  // ── Helpers ──────────────────────────────────────────────────────────────

  findOptionColorClass(fieldId: number, fieldValue: string): string {
    const option = this.fieldOptions.find(
      (opt) => opt.fieldId === fieldId && opt.value === fieldValue,
    );

    if (!option) return '';

    const color = this.fieldOptionColor.find(
      (color) => color.colorNumber === option.colorNumber,
    );
    return color?.colorClass || '';
  }

  findUsernameById(id: number | string | null): string {
    if (!id) return '<unassigned>';
    if (this.users.length === 0) return 'Loading...';
    const user = this.users.find((u) => u.id.toString() === id.toString());
    if (!user) {
      return '<unknown>';
    }
    return user.name;
  }

  formatDueDateForInput(dateStr: string | null): string {
    if (!dateStr) return '';
    return dateStr.substring(0, 10); // 'YYYY-MM-DD'
  }
}

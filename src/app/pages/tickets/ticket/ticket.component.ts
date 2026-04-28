import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { forkJoin } from 'rxjs';
import { DatePipe, TitleCasePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Ticket } from '../../../models/ticket/ticket.model';
import { TicketService } from '../../../services/ticket/ticket.service';
import { ProjectService } from '../../../services/project/project.service';
import { UserService } from '../../../services/user/user.service';
import { UserDTO } from '../../../dto/user/user.dto';
import { BreadcrumbComponent } from '../../util/breadcrumb/breadcrumb.component';
import { BreadcrumbRouteDTO } from '../../../dto/util/breadcrump-route.dto';
import { TicketStatus } from '../../../enums/ticket/ticket-status.enums';
import { TicketPriority } from '../../../enums/ticket/ticket-priority.enums';
import { UserIconComponent } from '../../user/user-icon/user-icon.component';

@Component({
  selector: 'app-ticket',
  imports: [
    TitleCasePipe,
    DatePipe,
    FormsModule,
    BreadcrumbComponent,
    UserIconComponent,
  ],
  templateUrl: './ticket.component.html',
  styleUrl: './ticket.component.css',
})
export class TicketComponent implements OnInit {
  ticket!: Ticket;
  breadcrumbRoutes: BreadcrumbRouteDTO[] = [];
  users: UserDTO[] = [];

  // Editing state flags
  editingTitle = false;
  editingDescription = false;
  editingStatus = false;
  editingPriority = false;
  editingAssignee = false;
  editingDueDate = false;

  // Draft values
  draftTitle = '';
  draftDescription = '';
  draftStatus: TicketStatus = TicketStatus.TODO;
  draftPriority: TicketPriority = TicketPriority.MEDIUM;
  draftAssigneeId: number = 0;
  draftDueDate = '';

  saving = false;

  readonly statuses = Object.values(TicketStatus);
  readonly priorities = Object.values(TicketPriority);

  constructor(
    private route: ActivatedRoute,
    private ticketService: TicketService,
    private projectService: ProjectService,
    private userService: UserService,
  ) {}

  ngOnInit(): void {
    const projectId = this.route.snapshot.paramMap.get('projectId');
    const ticketId = this.route.snapshot.paramMap.get('ticketId');

    this.userService.getUsers().subscribe((users) => {
      this.users = users;
    });

    if (projectId && ticketId) {
      forkJoin({
        project: this.projectService.getProject(parseInt(projectId)),
        ticket: this.ticketService.getTicket(parseInt(ticketId)),
      }).subscribe(({ project, ticket }) => {
        this.ticket = ticket;
        this.breadcrumbRoutes = [
          new BreadcrumbRouteDTO('Projects', '/projects'),
          new BreadcrumbRouteDTO(project.title, `/projects/${projectId}`),
          new BreadcrumbRouteDTO(ticket.title, null),
        ];
      });
    } else if (ticketId) {
      this.ticketService.getTicket(parseInt(ticketId)).subscribe((ticket) => {
        this.ticket = ticket;
        this.breadcrumbRoutes = [
          new BreadcrumbRouteDTO('Tickets', '/tickets'),
          new BreadcrumbRouteDTO(ticket.title, null),
        ];
      });
    }
  }

  // ── Helpers ──────────────────────────────────────────────────────────────

  getAssigneeName(assigneeId: number): string {
    const user = this.users.find((u) => u.id === assigneeId);
    return user ? user.name : 'Unassigned';
  }

  formatDueDateForInput(dateStr: string | null): string {
    if (!dateStr) return '';
    return dateStr.substring(0, 10); // 'YYYY-MM-DD'
  }

  statusLabel(status: TicketStatus): string {
    const map: Record<TicketStatus, string> = {
      [TicketStatus.TODO]: 'To Do',
      [TicketStatus.IN_PROGRESS]: 'In Progress',
      [TicketStatus.DONE]: 'Done',
    };
    return map[status] ?? status;
  }

  // ── Title ─────────────────────────────────────────────────────────────────

  startEditTitle(): void {
    this.draftTitle = this.ticket.title;
    this.editingTitle = true;
  }

  saveTitle(): void {
    if (!this.draftTitle.trim()) return;
    this.saveField({ title: this.draftTitle.trim() }, () => {
      this.ticket.title = this.draftTitle.trim();
      this.editingTitle = false;
    });
  }

  cancelTitle(): void {
    this.editingTitle = false;
  }

  // ── Description ───────────────────────────────────────────────────────────

  startEditDescription(): void {
    this.draftDescription = this.ticket.description;
    this.editingDescription = true;
  }

  saveDescription(): void {
    this.saveField({ description: this.draftDescription }, () => {
      this.ticket.description = this.draftDescription;
      this.editingDescription = false;
    });
  }

  cancelDescription(): void {
    this.editingDescription = false;
  }

  // ── Status ────────────────────────────────────────────────────────────────

  startEditStatus(): void {
    this.draftStatus = this.ticket.status;
    this.editingStatus = true;
  }

  saveStatus(): void {
    this.saveField({ status: this.draftStatus }, () => {
      this.ticket.status = this.draftStatus;
      this.editingStatus = false;
    });
  }

  cancelStatus(): void {
    this.editingStatus = false;
  }

  // ── Priority ──────────────────────────────────────────────────────────────

  startEditPriority(): void {
    this.draftPriority = this.ticket.priority;
    this.editingPriority = true;
  }

  savePriority(): void {
    this.saveField({ priority: this.draftPriority }, () => {
      this.ticket.priority = this.draftPriority;
      this.editingPriority = false;
    });
  }

  cancelPriority(): void {
    this.editingPriority = false;
  }

  // ── Assignee ──────────────────────────────────────────────────────────────

  startEditAssignee(): void {
    this.draftAssigneeId = this.ticket.assigneeId;
    this.editingAssignee = true;
  }

  saveAssignee(): void {
    this.saveField({ assigneeId: this.draftAssigneeId }, () => {
      this.ticket.assigneeId = this.draftAssigneeId;
      this.editingAssignee = false;
    });
  }

  cancelAssignee(): void {
    this.editingAssignee = false;
  }

  // ── Due Date ──────────────────────────────────────────────────────────────

  startEditDueDate(): void {
    this.draftDueDate = this.formatDueDateForInput(this.ticket.dueDate);
    this.editingDueDate = true;
  }

  saveDueDate(): void {
    this.saveField({ dueDate: this.draftDueDate }, () => {
      this.ticket.dueDate = this.draftDueDate;
      this.editingDueDate = false;
    });
  }

  cancelDueDate(): void {
    this.editingDueDate = false;
  }

  // ── Core save helper ──────────────────────────────────────────────────────

  private saveField(partial: Partial<Ticket>, onSuccess: () => void): void {
    this.saving = true;
    const updated: Ticket = { ...this.ticket, ...partial };
    this.ticketService.updateTicket(updated).subscribe({
      next: (saved) => {
        Object.assign(this.ticket, saved);
        onSuccess();
        this.saving = false;
      },
      error: () => {
        this.saving = false;
      },
    });
  }
}

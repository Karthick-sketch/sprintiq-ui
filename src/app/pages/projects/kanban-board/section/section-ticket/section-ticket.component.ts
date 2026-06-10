import { Component, Input } from '@angular/core';
import { DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { UserIconComponent } from '../../../../user/user-icon/user-icon.component';
import { SectionTicketDTO } from '../../../../../dto/ticket/ticket.dto';
import { ProjectDTO } from '../../../../../dto/project/project.dto';
import { UserDTO } from '../../../../../dto/user/user.dto';

@Component({
  selector: 'app-section-ticket',
  templateUrl: './section-ticket.component.html',
  styleUrls: ['./section-ticket.component.css'],
  imports: [RouterLink, DatePipe, UserIconComponent],
})
export class SectionTicketComponent {
  @Input() ticket!: SectionTicketDTO;
  @Input() project!: ProjectDTO;
  @Input() users!: UserDTO[];

  getFieldValue(systemKey: string): string {
    return (
      this.ticket?.fields?.find((f) => f.systemKey === systemKey)?.value || ''
    );
  }

  get status(): string {
    return this.getFieldValue('status');
  }

  get priority(): string {
    return this.getFieldValue('priority');
  }

  get dueDate(): string {
    return this.getFieldValue('due_date');
  }

  get assignee(): string {
    return (
      this.users.find(
        (user) => user.id.toString() === this.getFieldValue('assignee'),
      )?.name || '<unassigned>'
    );
  }

  getStatusLabel(status: string) {
    if (!status) return '';
    switch (status.toLowerCase().replace(' ', '_')) {
      case 'todo':
      case 'to_do':
        return 'To Do';
      case 'in_progress':
      case 'inprogress':
        return 'In Progress';
      case 'done':
        return 'Done';
      default:
        return status;
    }
  }

  getPriorityLabel(priority: string) {
    if (!priority) return '';
    return priority.charAt(0).toUpperCase() + priority.slice(1).toLowerCase();
  }
}

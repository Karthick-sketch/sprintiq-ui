import { Component } from '@angular/core';
import { DashboardTicketDTO } from '../../../dto/dashboard/dashboard-ticket.dto';
import { TicketPriority } from '../../../enums/ticket/ticket-priority.enums';
import { IconComponent } from '../../icon/icon.component';

@Component({
  selector: 'app-dashboard-tasks',
  standalone: true,
  templateUrl: './dashboard-tasks.component.html',
  styleUrl: './dashboard-tasks.component.css',
  imports: [IconComponent],
})
export class DashboardTasksComponent {
  tasks: DashboardTicketDTO[] = [
    {
      id: 1,
      title: 'Optimize database queries for better performance',
      priority: TicketPriority.URGENT,
      dueDate: 'Today',
    },
    {
      id: 2,
      title: 'Fix authentication token expiration issue',
      priority: TicketPriority.HIGH,
      dueDate: 'Tomorrow',
    },
    {
      id: 3,
      title: 'Implement caching for dashboard data',
      priority: TicketPriority.MEDIUM,
      dueDate: 'Tomorrow',
    },
  ];

  getPriorityColor(priority: TicketPriority): string {
    switch (priority) {
      case TicketPriority.URGENT:
        return 'bg-red-500';
      case TicketPriority.HIGH:
        return 'bg-yellow-500';
      case TicketPriority.MEDIUM:
        return 'bg-blue-500';
      case TicketPriority.LOW:
        return 'bg-green-500';
    }
  }
}

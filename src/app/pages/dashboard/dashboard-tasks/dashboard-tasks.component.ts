import { Component } from '@angular/core';
import { DashboardTicketDTO } from '../../../dto/dashboard/dashboard-ticket.dto';

import { IconComponent } from '../../icon/icon.component';

@Component({
  selector: 'app-dashboard-tasks',
  templateUrl: './dashboard-tasks.component.html',
  styleUrl: './dashboard-tasks.component.css',
  imports: [IconComponent],
})
export class DashboardTasksComponent {
  tasks: DashboardTicketDTO[] = [
    {
      id: 1,
      title: 'Optimize database queries for better performance',
      priority: 'URGENT',
      dueDate: 'Today',
    },
    {
      id: 2,
      title: 'Fix authentication token expiration issue',
      priority: 'HIGH',
      dueDate: 'Tomorrow',
    },
    {
      id: 3,
      title: 'Implement caching for dashboard data',
      priority: 'MEDIUM',
      dueDate: 'Tomorrow',
    },
  ];

  getPriorityColor(priority: string): string {
    switch (priority.toUpperCase()) {
      case 'URGENT':
        return 'bg-red-500';
      case 'HIGH':
        return 'bg-yellow-500';
      case 'MEDIUM':
        return 'bg-blue-500';
      case 'LOW':
        return 'bg-green-500';
      default:
        return 'bg-gray-500';
    }
  }
}

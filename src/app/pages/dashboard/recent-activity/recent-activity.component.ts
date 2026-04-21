import { Component } from '@angular/core';
import { RecentActivityDTO } from '../../../dto/dashboard/recent-activit.dto';

@Component({
  selector: 'app-recent-activity',
  templateUrl: './recent-activity.component.html',
  styleUrl: './recent-activity.component.css',
})
export class RecentActivityComponent {
  recentActivity: RecentActivityDTO[] = [
    {
      id: 1,
      icon: '/header/user.png',
      userName: 'John Doe',
      team: 'Team A',
      description: 'created a new task',
      time: '2 hours',
    },
    {
      id: 2,
      icon: '/header/user.png',
      userName: 'John Doe',
      team: 'Team A',
      description: 'created a new task',
      time: '2 hours',
    },
    {
      id: 3,
      icon: '/header/user.png',
      userName: 'John Doe',
      team: 'Team A',
      description: 'created a new task',
      time: '2 hours',
    },
    {
      id: 4,
      icon: '/header/user.png',
      userName: 'John Doe',
      team: 'Team A',
      description: 'created a new task',
      time: '2 hours',
    },
    {
      id: 5,
      icon: '/header/user.png',
      userName: 'John Doe',
      team: 'Team A',
      description: 'created a new task',
      time: '2 hours',
    },
  ];
}

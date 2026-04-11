import { Component } from '@angular/core';
import { DashboardCardComponent } from './dashboard-card/dashboard-card.component';
import { MetricsDTO } from '../../dto/dashboard/metrics.dto';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
  imports: [DashboardCardComponent],
})
export class DashboardComponent {
  metrics: MetricsDTO = {
    projects: 12,
    tickets: 28,
    completed: 42,
  };
}

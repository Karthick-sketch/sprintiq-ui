import { Component, Input } from '@angular/core';
import { IconComponent } from '../../icon/icon.component';

@Component({
  selector: 'app-dashboard-card',
  imports: [IconComponent],
  templateUrl: './dashboard-card.component.html',
  styleUrl: './dashboard-card.component.css',
})
export class DashboardCardComponent {
  @Input() value: number = 0;
  @Input() label: string = '';
  @Input() icon: string = '';
  @Input() color: string = '';
  @Input() bgColor: string = '';
}

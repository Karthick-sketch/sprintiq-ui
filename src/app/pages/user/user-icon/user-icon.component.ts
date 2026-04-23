import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-icon',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-icon.component.html',
  styleUrls: ['./user-icon.component.css'],
})
export class UserIconComponent implements OnInit {
  @Input() userName: string = '';
  @Input() size: 'small' | 'normal' = 'normal';
  userInitial: string = '';

  ngOnInit(): void {
    if (!this.userName) {
      this.userInitial = '';
      return;
    }
    const names = this.userName.trim().split(' ');
    if (names.length > 1) {
      this.userInitial = names[0].charAt(0) + names[1].charAt(0);
    } else {
      this.userInitial = this.userName.charAt(0) + this.userName.charAt(1);
    }
  }
}

import {
  Component,
  Input,
  OnInit,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-icon',
  imports: [CommonModule],
  templateUrl: './user-icon.component.html',
  styleUrls: ['./user-icon.component.css'],
})
export class UserIconComponent implements OnInit, OnChanges {
  @Input() userName: string = '';
  @Input() size: 'small' | 'normal' = 'normal';
  userInitial: string = '';

  ngOnInit(): void {
    this.updateInitial();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['userName']) {
      this.updateInitial();
    }
  }

  private updateInitial(): void {
    if (
      !this.userName ||
      this.userName === 'Loading...' ||
      this.userName === '<unassigned>' ||
      this.userName === '<unknown>'
    ) {
      this.userInitial = '?';
      return;
    }
    const names = this.userName.trim().split(' ');
    if (names.length > 1) {
      this.userInitial = (
        names[0].charAt(0) + names[1].charAt(0)
      ).toUpperCase();
    } else {
      this.userInitial = (
        this.userName.charAt(0) +
        (this.userName.length > 1 ? this.userName.charAt(1) : '')
      ).toUpperCase();
    }
  }
}

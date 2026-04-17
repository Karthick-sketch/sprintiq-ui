import { Component, Input } from '@angular/core';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-icon',
  imports: [NgClass],
  templateUrl: './icon.component.html',
  styleUrl: './icon.component.css',
})
export class IconComponent {
  @Input() url: string = '';
  @Input() size: string = 'w-6 h-6';
  @Input() isActive: boolean = false;
  @Input() activeClasses: string = '';
  @Input() inactiveClasses: string = '';

  get classes(): { [key: string]: boolean } {
    return {
      [this.activeClasses]: this.isActive,
      [this.inactiveClasses]: !this.isActive,
    };
  }
}

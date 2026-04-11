import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { IconComponent } from '../icon/icon.component';

@Component({
  selector: 'app-left-navigation-bar',
  imports: [RouterLink, RouterLinkActive, IconComponent],
  templateUrl: './left-navigation-bar.component.html',
  styleUrls: ['./left-navigation-bar.component.css'],
})
export class LeftNavigationBarComponent {}

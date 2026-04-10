import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-left-navigation-bar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './left-navigation-bar.component.html',
  styleUrls: ['./left-navigation-bar.component.css'],
})
export class LeftNavigationBarComponent {}

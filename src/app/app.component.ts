import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LeftNavigationBarComponent } from './pages/left-navigation-bar/left-navigation-bar.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, LeftNavigationBarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {}

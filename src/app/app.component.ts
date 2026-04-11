import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LeftNavigationBarComponent } from './pages/left-navigation-bar/left-navigation-bar.component';
import { HeaderComponent } from './pages/header/header.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, LeftNavigationBarComponent, HeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {}

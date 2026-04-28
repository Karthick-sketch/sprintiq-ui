import { Component, signal } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { filter } from 'rxjs/operators';
import { LeftNavigationBarComponent } from './pages/left-navigation-bar/left-navigation-bar.component';
import { HeaderComponent } from './pages/header/header.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, LeftNavigationBarComponent, HeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  isAuthPage = signal(false);

  private readonly authRoutes = ['/login', '/signup'];

  constructor(private router: Router) {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event) => {
        this.isAuthPage.set(
          this.authRoutes.includes((event as NavigationEnd).urlAfterRedirects),
        );
      });
  }
}

import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router,
  ) {}

  canActivate(): Observable<boolean> {
    return this.authService.isAuthenticated().pipe(
      map((authenticated) => {
        if (!authenticated) {
          this.router.navigate(['/login']);
        }
        return authenticated;
      }),
    );
  }
}

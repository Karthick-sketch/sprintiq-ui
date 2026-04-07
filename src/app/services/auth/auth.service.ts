import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable, of, tap } from 'rxjs';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = '/api/auth';
  private accessToken: string | null = null;

  constructor(
    private http: HttpClient,
    private tokenService: TokenService,
  ) {}

  login(credentials: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, credentials).pipe(
      tap((response) => {
        if (response && response.accessToken) {
          this.setAccessToken(response.accessToken);
        }
      }),
    );
  }

  register(userData: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/register`, userData).pipe(
      tap((response) => {
        if (response && response.accessToken) {
          this.setAccessToken(response.accessToken);
        }
      }),
    );
  }

  refreshToken(): Observable<any> {
    return this.http
      .post<any>(
        `${this.apiUrl}/refresh`,
        {},
        { withCredentials: true, observe: 'response' },
      )
      .pipe(
        tap((response) => {
          if (response && response.body.accessToken) {
            this.setAccessToken(response.body.accessToken);
          }
        }),
      );
  }

  logout(): Observable<any> {
    return this.http
      .post<any>(`${this.apiUrl}/logout`, {}, { withCredentials: true })
      .pipe(
        tap(() => {
          this.clearAccessToken();
        }),
      );
  }

  private setAccessToken(token: string) {
    this.accessToken = token;
  }

  getAccessToken(): string | null {
    return this.accessToken;
  }

  clearAccessToken() {
    this.accessToken = null;
  }

  isAuthenticated(): Observable<boolean> {
    if (this.tokenService.isLoggedIn(this.accessToken)) {
      return of(true);
    }
    return this.refreshToken().pipe(
      map((res: any) => {
        const token = res.body?.accessToken;
        if (token) {
          this.setAccessToken(token);
          return true;
        }
        return false;
      }),
      catchError(() => {
        this.clearAccessToken();
        return of(false);
      }),
    );
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = '/api/auth';
  private accessToken: string | null = null;

  constructor(private http: HttpClient) {}

  login(credentials: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, credentials).pipe(
      tap((response) => {
        if (response && response.accessToken) {
          this.setToken(response.accessToken);
        }
      }),
    );
  }

  register(userData: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/register`, userData).pipe(
      tap((response) => {
        if (response && response.accessToken) {
          this.setToken(response.accessToken);
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
            this.setToken(response.body.accessToken);
          }
        }),
      );
  }

  logout(): Observable<any> {
    return this.http
      .post<any>(`${this.apiUrl}/logout`, {}, { withCredentials: true })
      .pipe(
        tap(() => {
          this.clearToken();
        }),
      );
  }

  private setToken(token: string) {
    this.accessToken = token;
  }

  getToken(): string | null {
    return this.accessToken;
  }

  clearToken() {
    this.accessToken = null;
  }

  isAuthenticated(): Observable<boolean> {
    if (this.accessToken) {
      return of(true);
    }
    return this.refreshToken().pipe(
      map((res: any) => {
        const token = res.body?.accessToken;
        if (token) {
          this.setToken(token);
          return true;
        }
        return false;
      }),
      catchError(() => {
        this.clearToken();
        return of(false);
      }),
    );
  }
}

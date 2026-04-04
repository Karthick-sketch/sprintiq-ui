import { Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';

export interface JwtPayload {
  exp: number;
  iat: number;
  sub: string;
  type: string;
}

@Injectable({
  providedIn: 'root',
})
export class TokenService {
  isLoggedIn(accessToken: string | null): boolean {
    if (!accessToken) {
      return false;
    }
    return !this.isTokenExpired(accessToken);
  }

  isTokenExpired(accessToken: string): boolean {
    const payload = this.decodeToken(accessToken);
    if (!payload || payload.type !== 'access') {
      return true;
    }
    return payload.exp < Date.now() / 1000;
  }

  decodeToken(accessToken: string): JwtPayload | null {
    try {
      return jwtDecode<JwtPayload>(accessToken);
    } catch (error) {
      console.error('Error decoding token:', error);
      return null;
    }
  }
}

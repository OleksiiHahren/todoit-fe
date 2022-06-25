import { Injectable } from '@angular/core';

export enum AuthKeys {
  jwt_token = 'accessToken',
  refresh_token = 'refreshToken',
}

@Injectable({providedIn: 'root'})
export class TokenService {
  getJwtToken(): string | null {
    return localStorage.getItem(AuthKeys.jwt_token);
  }

  getRefreshToken(): string | null {
    return localStorage.getItem(AuthKeys.refresh_token);
  }

  setJwtToken(token: string): void {
    localStorage.setItem(AuthKeys.jwt_token, token);
  }

  setRefreshToken(refresh_token: string): void {
    localStorage.setItem(AuthKeys.refresh_token, refresh_token);
  }

  removeJwtToken(): void {
    localStorage.removeItem(AuthKeys.jwt_token);
  }

  removeRefreshToken(): void {
    localStorage.removeItem(AuthKeys.refresh_token);
  }

  jwtTokenExists(): boolean {
    return !!this.getJwtToken();
  }
}

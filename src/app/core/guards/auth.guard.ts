import { Injectable } from '@angular/core';
import { CanLoad, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { TokenService } from '../services/token.service';

@Injectable()
export class AuthGuard implements CanLoad {
  constructor(private router: Router, private tokenService: TokenService) {}

  canLoad(
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (!this.tokenService.jwtTokenExists()) {
      this.router.navigate(['auth/login']);
    }
    return this.tokenService.jwtTokenExists();
  }
}

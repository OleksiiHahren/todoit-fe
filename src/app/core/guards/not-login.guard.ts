import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate, CanLoad,
  Router,
  RouterStateSnapshot,
  UrlTree
} from '@angular/router';
import { Observable } from 'rxjs';
import { TokenService } from '../services/token.service';

@Injectable()
export class NotLoginGuard implements CanLoad {
  constructor(private tokenService: TokenService,
              private router: Router) {}
  canLoad(
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this.tokenService.jwtTokenExists()) {
      this.router.navigate(['/main']);
    }
    return !this.tokenService.jwtTokenExists();
  }

}

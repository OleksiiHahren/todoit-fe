import {
  HttpEvent,
  HttpEventType,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { mergeMap, Observable, of, switchMap, tap, throwError } from 'rxjs';
import { concatMap, take } from 'rxjs/operators';
import { TokenService } from '../services/token.service';
import { AuthService } from '../../auth/services/auth.service';

@Injectable()
export class AuthHttpInterceptor implements HttpInterceptor {

  constructor(private tokenService: TokenService,
              private authService: AuthService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // get current access token value
    let token = this.tokenService.getJwtToken();
    let refreshToken = this.tokenService.getRefreshToken();
    return next.handle(req.clone({
      setHeaders: {Authorization: `Bearer ${token}`}
    })).pipe(
      mergeMap((res) => {
        const resData = res as HttpResponse<any>;
        const unauthorisedExists =
          resData.body?.errors.find((el: { extensions: { status: number; } }) => el.extensions.status === 401);
        if (unauthorisedExists && token && refreshToken) {
          debugger

          return next.handle(req)
        }
        return of(res);
      }));
  }

  private sendRefreshToken(refreshToken: string) {
    this.authService.updateTokens(refreshToken).pipe(
      switchMap(res=> {
        this.tokenService.setJwtToken(res.accessToken);
        this.tokenService.setRefreshToken(res.refreshToken);
        return of(res)
      })
    ).subscribe()
  }

}

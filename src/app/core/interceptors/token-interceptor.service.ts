import {
  HttpEvent,
  HttpEventType,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  BehaviorSubject, catchError,
  concatMap,
  mergeMap,
  Observable,
  of, Subject,
  switchMap,
  tap,
  throwError
} from 'rxjs';
import { TokenService } from '../services/token.service';
import { AuthService } from '../../auth/services/auth.service';
import {
  AuthResponseInterface
} from '../../auth/interfaces/auth-response.interface';
import { error } from '@angular/compiler/src/util';

@Injectable()
export class AuthHttpInterceptor implements HttpInterceptor {

  constructor(private tokenService: TokenService,
    private authService: AuthService) {
  }

  gettingRefreshTokens = false;
  oldFailedReq!: HttpRequest<any>;

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // get current access token value
    let accessToken = this.tokenService.getJwtToken();
    let refreshToken = this.tokenService.getRefreshToken();
    return next.handle(req.clone({
      setHeaders: {Authorization: `Bearer ${accessToken}`}
    })).pipe(
      concatMap((res) => {
        if (!this.gettingRefreshTokens && req.body.operationName !== 'signIn' && req.body.operationName !== 'signUp') {
          const resData = res as HttpResponse<any>;
          const unauthorisedExists =
            resData.body?.errors?.find((el: {extensions: {status: number;}}) => el.extensions.status === 401);
          if (accessToken && unauthorisedExists) {
            this.oldFailedReq = req;
            return this.sendRefreshToken(refreshToken).pipe(
              switchMap(res => {
                accessToken = res.accessToken;
                refreshToken = res.refreshToken;
                this.tokenService.setJwtToken(res.accessToken);
                this.tokenService.setRefreshToken(res.refreshToken);
                this.gettingRefreshTokens = false;
                return next.handle(this.oldFailedReq.clone({
                  setHeaders: {Authorization: `Bearer ${res.accessToken}`}
                }));
              }),
              catchError(error => {
                  this.tokenService.removeRefreshToken();
                  this.tokenService.removeJwtToken();
                  return of(res);
                }
              )
            );

          }
        }
        return of(res);
      }));
  }

  private sendRefreshToken(refreshToken: string): Observable<AuthResponseInterface> {
    this.gettingRefreshTokens = true;
    return this.authService.updateTokens(refreshToken).pipe(

    );
  }

  // TODO finish this shit
}

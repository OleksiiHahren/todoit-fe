/*
import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { AuthService } from '../../auth/services/auth.service';
import { catchError, filter, finalize, switchMap, take, tap } from 'rxjs/operators';
import {MatSnackBar} from "@angular/material/snack-bar";
import {isArray} from "rxjs/internal-compatibility";

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  readonly authTokenUrl = '/auth/token';
  readonly sigInUrl = 'auth/sign-in';
  readonly signUpUrl = 'auth/sign-up';
  private refreshTokenInProgress = false;
  private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  constructor(private auth: AuthService,
              private snackBar: MatSnackBar
              ) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(this.addAuthenticationToken(request)).pipe(
      tap(() => this.spinnerService.toggleDisplay(true)),
      catchError((error) => {
        if (request.url.includes(this.signUpUrl) || request.url.includes(this.sigInUrl)) {
          if (request.url.includes(this.authTokenUrl)) {
            this.auth.logOutUser();
          }
          return throwError(error);
        }
        if (error.status !== 401) {
          this.snackBar.openFromComponent(ErrorSnackComponent, {
            data: this.errorMessage(error),
            duration: 2000,
          })
          return throwError(error);
        }

        if (this.refreshTokenInProgress) {
          return this.refreshTokenSubject.pipe(
            filter((result) => result !== null),
            take(1),
            switchMap(() => next.handle(this.addAuthenticationToken(request))),
          );
        } else {
          this.refreshTokenInProgress = true;
          this.refreshTokenSubject.next(null);
          return this.auth.refreshTokenReq().pipe(
            catchError((err: any) => {
              this.refreshTokenInProgress = false;
              this.auth.logOutUser();
              return of(err);
            }),
            switchMap((token: any) => {
              this.refreshTokenInProgress = false;
              this.refreshTokenSubject.next(token.refreshToken);
              return next.handle(this.addAuthenticationToken(request));
            }),
          );
        }
      }),
      finalize(() => this.spinnerService.toggleDisplay(false)),
    );
  }

  private errorMessage(data){
    if(data.error.hasOwnProperty('message') && isArray(data.error.message)){
      console.log(data.error.message);
      return data.error.message[0]?.detail
    } else {
      return data.error.message
    }
  }

  addAuthenticationToken(request): HttpRequest<any> {
    this.auth.userTokenExpiredOrNotExist();
    if (request.url.includes(this.authTokenUrl)) {
      return request.clone({
        setHeaders: {
          Authorization: `Bearer ${this.auth.getRefreshToken()}`,
        },
      });
    } else if (request.url.includes(this.sigInUrl) || request.url.includes(this.signUpUrl)) {
      return request;
    }
    return request.clone({
      setHeaders: {
        Authorization: `Bearer ${this.auth.getToken()}`,
      },
    });
  }
}
*/

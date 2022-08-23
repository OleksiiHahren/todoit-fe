
import {
  HttpEvent, HttpEventType, HttpHandler, HttpInterceptor, HttpRequest
} from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable, of } from 'rxjs'
import { concatMap, take } from 'rxjs/operators'
import { TokenService } from '../services/token.service';

@Injectable()
export class AuthHttpInterceptor implements HttpInterceptor {

  constructor (private tokenService: TokenService) {
  }

  intercept (req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // get current access token value
    const token = this.tokenService.getJwtToken();
    const refreshToken = this.tokenService.getRefreshToken();
    return next.handle(req.clone({
      setHeaders: { Authorization: `Bearer ${token}` }
    }))


/*    return this.accessToken$.pipe(
      take(1),
      // --- if access token available, set it to header before sending request to server
      concatMap(accessToken => {
        if (accessToken) {

        }
        return next.handle(req)
      }),
      // --- login with refresh token on UNAUTHENTICATED graphql error, then try again.
      // Your Apollo server should throw AuthenticationError if an access token has expired.
      // For more info, see: https://www.apollographql.com/docs/apollo-server/features/errors.html
      concatMap(event => {
        let needToAuthenticate = false
        if (
          event.type === HttpEventType.Response &&
          event.status === 200 &&
          event.body &&
          Array.isArray(event.body.errors)
        ) {
          const errors = event.body.errors as any[]
          needToAuthenticate = !!errors.find(e => e.extensions && e.extensions.code === 'UNAUTHENTICATED')
        }

        if (needToAuthenticate) {
          // update access token by logging in to your auth server using a refresh token
          return this.refreshToken$.pipe(
            take(1),
            concatMap(refreshToken => this.store.dispatch(new AuthStateActions.LoginWithRefreshToken(refreshToken))),
            // the previous LoginWithRefreshToken should have updated access token's value
            // get the value and retry the failed request
            concatMap(() => this.accessToken$.pipe(take(1))),
            concatMap(accessToken => {
              if (accessToken) {
                return next.handle(req.clone({
                  setHeaders: { Authorization: `Bearer ${accessToken}` }
                }))
              } else {
                // if logging in with refresh token failed to update access token, then can't help it...
                // --- apollo-link does not understand return throwError('message') so just throw new error
                throw new Error('Error getting access token after logging in with refresh token')
              }
            })
          )
        }
        return of(event)
      })
    )*/
  }
}

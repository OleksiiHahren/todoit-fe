import { HttpLink } from 'apollo-angular/http';
import { setContext } from '@apollo/client/link/context';
import { Injectable } from '@angular/core';
import { AuthService } from '../../auth/services/auth.service';
import { TokenService } from '../services/token.service';
import { lastValueFrom } from 'rxjs';


const auth = setContext(async (_, {header}) => {
  let token = localStorage.getItem('accessToken');

  if (!token) {

  }
});

@Injectable()
export class ApolloContextCreator {
  constructor(private tokenService: TokenService,
    private authService: AuthService) {

  }

  createApollo() {

  }

  setContext() {
    return setContext(async (_, {headers}) => {
      let token = this.tokenService.getJwtToken();
      let oldRefreshToken = this.tokenService.getRefreshToken();

      if (!token || oldRefreshToken) {
        const {
          accessToken,
          refreshToken
        } = await lastValueFrom(this.authService.updateTokens(oldRefreshToken));
        this.tokenService.setJwtToken(accessToken);
        this.tokenService.setRefreshToken(refreshToken);
      }
    });

  }
}

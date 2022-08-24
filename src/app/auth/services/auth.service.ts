import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Apollo, gql } from 'apollo-angular';
import { LoginInterface } from '../interfaces/login.interface';
import { AuthResponseInterface } from '../interfaces/auth-response.interface';

import { SignUpInterface } from '../interfaces/sign-up.interface';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  readonly getTokens = gql`
    query signIn($signInData: SignInType!){
        signIn(signInData: $signInData)
             {
          accessToken
          refreshToken
        }
    }
`;
  readonly signUpMutation = gql`
    mutation signUp($user: UserCreation!) {
      signUp(user: $user) {
      accessToken
      refreshToken
      }
    }
  `;

  readonly refreshTokenMutation = gql`
    mutation refreshToken($refreshToken: String!) {
      refreshToken(refreshToken: $refreshToken) {
      accessToken
      refreshToken
      }
    }
  `;


  constructor(private http: HttpClient,
    private apollo: Apollo) { }

  googleAuth(): Observable<any> {
    return this.http.get(environment.backendUrlGoogle);
  }

  login(loginData: LoginInterface): Observable<AuthResponseInterface> {
    return this.apollo.query<{signIn: AuthResponseInterface}>({
      query: this.getTokens,
      variables: {
        signInData: loginData
      }
    }).pipe(map(result => {
      return result.data.signIn;
    }));
  }

  signUp(user: SignUpInterface): Observable<AuthResponseInterface> {
    return this.apollo.mutate({
        mutation: this.signUpMutation,
        variables: {
          user
        }
      }
    ).pipe(map((result) => {
      return result.data;
    })) as Observable<AuthResponseInterface>;
  }

  updateTokens(refreshToken: string): Observable<AuthResponseInterface> {
    return this.apollo.mutate({
      mutation: this.refreshTokenMutation,
      variables: {refreshToken: refreshToken}
    }).pipe(map((result) => {
      return result.data;
    })) as Observable<AuthResponseInterface>;

  }
}

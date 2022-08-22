import { Injectable } from '@angular/core';
import { gql, Mutation } from 'apollo-angular';
import { AuthResponseInterface } from '../interfaces/auth-response.interface';

@Injectable({
  providedIn: 'root'
})
export class RefreshTokenServiceMutation extends Mutation<AuthResponseInterface, {refreshToken: string}> {
  refreshTokenMutation = gql`
    mutation refreshToken($refreshToken: String!) {
      refreshToken(refreshToken: $refreshToken) {
      accessToken
      refreshToken
      }
    }
  `;
}

import { Injectable } from '@angular/core';
import { gql, Mutation } from 'apollo-angular';
import { AuthResponseInterface } from '../interfaces/auth-response.interface';
import { SignUpInterface } from '../interfaces/sign-up.interface';

@Injectable({
  providedIn: 'root'
})
export class SignUpMutationService extends Mutation<AuthResponseInterface, SignUpInterface> {
  signUpMutation = gql`
    mutation signUp($user: UserCreation!) {
      signUp(user: $user) {
      accessToken
      refreshToken
      }
    }
  `;
}


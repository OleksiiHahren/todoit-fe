import { Injectable } from '@angular/core';
import {
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { map, Observable } from 'rxjs';
import { Apollo, gql } from 'apollo-angular';
import { UserInterface } from '../interfaces/user.interface';

const User = gql`
  query {
  me {
    firstName
    lastName
  }
}
`;

@Injectable({
  providedIn: 'root'
})
export class UserAccountResolver implements Resolve<Observable<UserInterface>> {
  constructor(private apollo: Apollo) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<UserInterface> {
   return this.apollo.query<UserInterface>({
      query: User
    }).pipe(map(result => {
      console.log(result)
      return result.data
      }));
  }
}

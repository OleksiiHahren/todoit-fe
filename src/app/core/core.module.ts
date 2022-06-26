import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { APOLLO_OPTIONS, ApolloModule } from 'apollo-angular';
import { HttpLink } from 'apollo-angular/http';
import { environment } from '../../environments/environment';
import { InMemoryCache } from '@apollo/client/core';
import { NotLoginGuard } from './guards/not-login.guard';
import { AuthGuard } from './guards/auth.guard';
import { AuthService } from '../auth/services/auth.service';
import { HttpClientModule, HttpHeaders } from '@angular/common/http';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule,
    ApolloModule
  ],
  providers: [
    {
      provide: APOLLO_OPTIONS,
      useFactory: (httpLink: HttpLink) => {
        return {
          cache: new InMemoryCache(),
          link: httpLink.create({
            uri: environment.backendUrlGraphQl,
            headers: new HttpHeaders().set(
              'Authorization', 'Bearer ' // TODO figure out how to make interceptors
            )
      }),
      }
      },
      deps: [HttpLink],
    },
    NotLoginGuard,
    AuthGuard,
    AuthService,
  ],

})
export class CoreModule { }

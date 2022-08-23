import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { APOLLO_OPTIONS, ApolloModule } from 'apollo-angular';
import { HttpLink } from 'apollo-angular/http';
import { environment } from '../../environments/environment';
import { InMemoryCache } from '@apollo/client/core';
import { NotLoginGuard } from './guards/not-login.guard';
import { AuthGuard } from './guards/auth.guard';
import { AuthService } from '../auth/services/auth.service';
import {
  HTTP_INTERCEPTORS,
  HttpClientModule,
  HttpHeaders
} from '@angular/common/http';
import { AuthHttpInterceptor } from './interceptors/token-interceptor.service';



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
      }),
      }
      },
      deps: [HttpLink],
    },
    { provide: HTTP_INTERCEPTORS, useClass: AuthHttpInterceptor, multi: true },
    NotLoginGuard,
    AuthGuard,
    AuthService,
  ],

})
export class CoreModule { }

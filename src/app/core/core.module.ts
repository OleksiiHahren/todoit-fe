import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { APOLLO_OPTIONS} from 'apollo-angular';
import {HttpLink} from 'apollo-angular/http';
import { environment } from '../../environments/environment';
import { InMemoryCache } from '@apollo/client/core';
import { NotLoginGuard } from './guards/not-login.guard';
import { AuthGuard } from './guards/auth.guard';
import { AuthService } from '../auth/services/auth.service';
import { HttpClientModule } from '@angular/common/http';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule
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
        };
      },
      deps: [HttpLink],
    },
    NotLoginGuard,
    AuthGuard,
    AuthService,
  ],

})
export class CoreModule { }

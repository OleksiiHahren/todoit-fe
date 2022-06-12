import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { APOLLO_OPTIONS} from 'apollo-angular';
import {HttpLink} from 'apollo-angular/http';
import { environment } from '../../environments/environment';
import { InMemoryCache } from '@apollo/client/core';
import { NotLoginGuard } from './guards/not-login.guard';
import { AuthGuard } from './guards/auth.guard';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [
    {
      provide: APOLLO_OPTIONS,
      useFactory: (httpLink: HttpLink) => {
        return {
          cache: new InMemoryCache(),
          link: httpLink.create({
            uri: environment.backendUrl,
          }),
        };
      },
      deps: [HttpLink],
    },
    NotLoginGuard,
    AuthGuard
  ],

})
export class CoreModule { }

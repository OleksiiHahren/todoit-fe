import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserAccountResolver } from './services/user-account.resolver';
import { AccountComponent } from './account/account.component';

const routes: Routes = [{
  path: '',
  redirectTo: 'me',
},
  {
    path: 'me',
    component: AccountComponent,
    resolve: {
      user: UserAccountResolver
    }
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class UserRoutingModule {}

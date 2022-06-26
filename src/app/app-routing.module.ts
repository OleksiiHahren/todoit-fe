import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotLoginGuard } from './core/guards/not-login.guard';
import { AuthGuard } from './core/guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'workspace',
    pathMatch: 'full',
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule),
    canLoad: [NotLoginGuard]
  },
  {
    path: 'workspace',
    loadChildren: () => import('./workspace/workspace.module')
      .then((m) => m.WorkspaceModule),
    canLoad: [AuthGuard],
  },
  {
    path: 'account',
    loadChildren: () => import('./user/user.module')
      .then((m) => m.UserModule),
    canLoad: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

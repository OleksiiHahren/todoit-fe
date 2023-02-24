import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {
  ProjectDetailsComponent
} from './components/project-details/project-details.component';

const routes: Routes = [

  {
    path: ':projectId',
    component: ProjectDetailsComponent
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [
    RouterModule
  ],

})
export class ProjectRoutingModule {}

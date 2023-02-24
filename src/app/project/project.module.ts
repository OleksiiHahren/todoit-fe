import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ProjectDetailsComponent
} from './components/project-details/project-details.component';
import { ProjectRoutingModule } from './project-routing.module';



@NgModule({
  declarations: [
    ProjectDetailsComponent,

  ],
  imports: [
    CommonModule,
    ProjectRoutingModule
  ]
})
export class ProjectModule {}

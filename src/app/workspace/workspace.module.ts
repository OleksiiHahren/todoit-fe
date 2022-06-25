import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WorkspaceRoutingModule } from './workspace-routing.module';
import { MainComponent } from './components/main/main.component';
import { SharedModule } from '../shared/shared.module';
import { MatButtonModule } from '@angular/material/button';


@NgModule({
  declarations: [
    MainComponent
  ],
  imports: [
    CommonModule,
    WorkspaceRoutingModule,
    SharedModule,
    MatButtonModule
  ]
})
export class WorkspaceModule { }

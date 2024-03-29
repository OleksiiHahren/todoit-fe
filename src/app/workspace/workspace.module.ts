import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WorkspaceRoutingModule } from './workspace-routing.module';
import { MainComponent } from './components/main/main.component';
import { SharedModule } from '../shared/shared.module';
import { MatButtonModule } from '@angular/material/button';
import { SideNavComponent } from './components/side-nav/side-nav.component';
import { MatTreeModule } from '@angular/material/tree';
import { MatRippleModule } from '@angular/material/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatMenuModule } from '@angular/material/menu';
import { ProjectModule } from '../project/project.module';
import {GlobalSearchModule} from "../global-search/global-search.module";


@NgModule({
  declarations: [
    MainComponent,
    SideNavComponent
  ],
  imports: [
    CommonModule,
    WorkspaceRoutingModule,
    GlobalSearchModule,
    ProjectModule,
    SharedModule,
    MatButtonModule,
    MatTreeModule,
    MatRippleModule,
    MatExpansionModule,
    MatMenuModule
  ]
})
export class WorkspaceModule {}

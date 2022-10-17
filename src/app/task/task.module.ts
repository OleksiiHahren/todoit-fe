import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TaskRoutingModule } from './task-routing.module';
import { TaskListComponent } from './components/task-list/task-list.component';
import { MatCardModule } from '@angular/material/card';
import { TaskForTodayComponent } from './components/task-for-today/task-for-today.component';
import { TaskUpcomingComponent } from './components/task-upcoming/task-upcoming.component';


@NgModule({
  declarations: [
    TaskListComponent,
    TaskForTodayComponent,
    TaskUpcomingComponent
  ],
  imports: [
    CommonModule,
    TaskRoutingModule,
    MatCardModule
  ]
})
export class TaskModule { }

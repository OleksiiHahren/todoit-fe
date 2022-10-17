import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TaskListComponent } from './components/task-list/task-list.component';
import {
  TaskForTodayComponent
} from './components/task-for-today/task-for-today.component';
import {
  TaskUpcomingComponent
} from './components/task-upcoming/task-upcoming.component';

const routes: Routes = [{
  path: '',
  redirectTo: 'income'
},
  {
    path: 'income',
    component: TaskListComponent
  },
  {
    path: 'today',
    component: TaskForTodayComponent
  },
  {
    path: 'upcoming',
    component: TaskUpcomingComponent
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TaskRoutingModule {}

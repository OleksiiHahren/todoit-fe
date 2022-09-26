import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TaskListComponent } from './components/task-list/task-list.component';
import {
  TaskForTodayComponent
} from './components/task-for-today/task-for-today.component';

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
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TaskRoutingModule {}

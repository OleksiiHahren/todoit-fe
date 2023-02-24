import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './components/main/main.component';

const routes: Routes = [{
  path: '',
  component: MainComponent,
  children: [{
    path: '',
    redirectTo: 'task-list'
  },
    {
      path: 'task-list',
      loadChildren: () => import('../task/task.module').then((m) => m.TaskModule),
    },
    {
      path: 'project',
      loadChildren: () => import('../project/project.module').then((m) => m.ProjectModule),
    },
  ]
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WorkspaceRoutingModule {}

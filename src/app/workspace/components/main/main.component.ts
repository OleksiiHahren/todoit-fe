import { Component, OnInit } from '@angular/core';
import { TokenService } from '../../../core/services/token.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import {
  ModalWrapperComponent
} from '../../../shared/modal/components/modal-wrapper/modal-wrapper.component';
import { ModalTypesEnum } from '../../../core/enums/modal-types.enum';
import { filter, Observable } from 'rxjs';
import { TaskService } from '../../../task/services/task.service';
import {
  TaskItemInterface
} from '../../../task/interfaces/task-item.interface';
import {
  ProjectItemInterface
} from '../../../project/interfaces/project-item.interface';
import { ProjectService } from '../../../project/services/project.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  toggleSideBar = false;

  favoriteProjects$: Observable<ProjectItemInterface[]>;
  projects$: Observable<ProjectItemInterface[]>;

  constructor(private tokenService: TokenService,
    public dialog: MatDialog,
    private router: Router,
    private taskService: TaskService,
    private projectService: ProjectService
  ) {
    this.favoriteProjects$ = this.projectService.favoriteProjects$;
    this.projects$ = this.projectService.allProjects$;
  }

  ngOnInit(): void {
    this.projectService.getFavoriteProjects({limit: 10, offset: 0});
    this.projectService.getOwnProjects({limit: 10, offset: 0});
  }

  addNewTask(): void {
    this.dialog.open(ModalWrapperComponent, {
      data: {
        payload: null,
        type: ModalTypesEnum.Task
      },
      height:'600px'
    })
      .afterClosed()
      .pipe(filter(res => res !== null))
      .subscribe(res => this.#addTask(res));
  }

  logout() {
    this.tokenService.removeJwtToken();
    this.tokenService.removeRefreshToken();
    this.router.navigate(['auth/login']);
  }

  goToAccount() {
    this.router.navigate(['/account']);
  }

  onCreateProject() {
    this.dialog.open(ModalWrapperComponent, {
      data: {
        payload: null,
        type: ModalTypesEnum.Project
      }
    }).afterClosed()
      .pipe(filter(res => res !== null))
      .subscribe(res => this.projectService.createProject(res));
  }

  onUpdateProject(data: ProjectItemInterface) {
    this.dialog.open(ModalWrapperComponent, {
      data: {
        payload: data,
        type: ModalTypesEnum.Project
      }
    }).afterClosed()
      .pipe(filter(res => res !== null))
      .subscribe(res => this.projectService.updateProject(res));
  }

  onDeleteProject(id: string) {
    this.dialog.open(ModalWrapperComponent,
      {
        data: {
          payload: null,
          type: ModalTypesEnum.Delete
        }
      }
    ).afterClosed()
      .pipe(filter(res => res !== null))
      .subscribe(res => this.projectService.deleteProject(id));
  }

  #addTask(data: TaskItemInterface) {
    this.taskService.createTask(data).pipe(
    ).subscribe(
      res => this.taskService.getAllIncomeTasks()
    );
  }

  #updateProject(){

  }

}

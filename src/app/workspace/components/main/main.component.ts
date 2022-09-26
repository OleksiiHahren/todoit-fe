import { Component, OnInit } from '@angular/core';
import { TokenService } from '../../../core/services/token.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import {
  ModalWrapperComponent
} from '../../../shared/modal/components/modal-wrapper/modal-wrapper.component';
import { ModalTypesEnum } from '../../../core/enums/modal-types.enum';
import { filter, switchMap } from 'rxjs';
import { TaskService } from '../../../task/services/task.service';
import {
  TaskItemInterface
} from '../../../task/interfaces/task-item.interface';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  toggleSideBar = false;

  constructor(private tokenService: TokenService,
    public dialog: MatDialog,
    private router: Router,
    private taskService: TaskService
  ) { }

  ngOnInit(): void {
  }

  addNewTask(): void {
    this.dialog.open(ModalWrapperComponent, {
      data: {
        payload: null,
        type: ModalTypesEnum.Task
      }
    })
      .afterClosed()
      .pipe(filter(res => res !== null))
      .subscribe(res=> this.#addTask(res));
  }

  logout() {
    this.tokenService.removeJwtToken();
    this.tokenService.removeRefreshToken();
    this.router.navigate(['auth/login']);
  }

  goToAccount() {
    this.router.navigate(['/account']);
  }

  #addTask(data: TaskItemInterface) {
    this.taskService.createTask(data).pipe(
    ).subscribe(
      res => this.taskService.getAllIncomeTasks()
    );
  }

}

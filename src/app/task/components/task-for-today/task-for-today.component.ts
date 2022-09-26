import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { TaskService } from '../../services/task.service';

@Component({
  selector: 'app-task-for-today',
  templateUrl: './task-for-today.component.html',
  styleUrls: ['./task-for-today.component.scss']
})
export class TaskForTodayComponent implements OnInit {

  tasks$!: Observable<any>;

  constructor(public taskService: TaskService) { }

  ngOnInit(): void {
    this.taskService.getAllIncomeTasks({limit: 20, offset: 0});
  }

}

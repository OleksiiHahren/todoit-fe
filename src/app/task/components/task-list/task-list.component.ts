import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../services/task.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss']
})
export class TaskListComponent implements OnInit {

  tasks$!: Observable<any>;
  constructor(private taskService: TaskService) { }

  ngOnInit(): void {
   this.tasks$ = this.taskService.getAllIncomeTasks();
  }

}

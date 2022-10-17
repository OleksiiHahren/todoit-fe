import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { TaskService } from '../../services/task.service';

@Component({
  selector: 'app-task-upcoming',
  templateUrl: './task-upcoming.component.html',
  styleUrls: ['./task-upcoming.component.scss']
})
export class TaskUpcomingComponent implements OnInit {

  tasks$!: Observable<any>;

  constructor(public taskService: TaskService) { }

  ngOnInit(): void {
    this.taskService.getAllUpcomingTasks({limit: 20, offset: 0});
  }

}

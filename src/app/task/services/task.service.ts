import {Injectable} from '@angular/core';
import {Apollo} from 'apollo-angular';
import {BehaviorSubject, map, share} from 'rxjs';
import {TaskItemInterface} from '../interfaces/task-item.interface';
import {taskQueries} from './graph-queries/task-queries';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  readonly taskQueries = taskQueries;

  #incomeTasks$ = new BehaviorSubject<TaskItemInterface[] | null>(null);
  incomeTasks$ = this.#incomeTasks$.asObservable();
  #todayTasks$ = new BehaviorSubject<TaskItemInterface[] | null>(null);
  todayTasks$ = this.#todayTasks$.asObservable();
  #upcomingTasks$ = new BehaviorSubject<TaskItemInterface[] | null>(null);
  upcomingTasks$ = this.#upcomingTasks$.asObservable();

  constructor(private apollo: Apollo) {
  }

  getAllIncomeTasks(paging = {limit: 10, offset: 0}) {
    return this.apollo.query<{ taskIncomes: TaskItemInterface[] }>(
      {query: this.taskQueries.getTasksIncomeQuery, variables: {paging}}
    ).pipe(
      share(),
      map(res => res.data)
    ).subscribe(res => {
        const {taskIncomes} = res;
        this.#incomeTasks$.next(taskIncomes);
      }
    );
  }

  getAllTodayTasks(paging = {limit: 10, offset: 0}) {
    return this.apollo.query<{ tasksForToday: TaskItemInterface[] }>(
      {query: this.taskQueries.getTasksTodayQuery, variables: {paging}}
    ).pipe(
      share(),
      map(res => res.data)
    ).subscribe(res => {
        const {tasksForToday} = res;
        this.#todayTasks$.next(tasksForToday);
      }
    );
  }

  getAllUpcomingTasks(paging = {limit: 10, offset: 0}) {
    return this.apollo.query<{ tasksForFuture: TaskItemInterface[] }>(
      {query: this.taskQueries.getTasksUpcomingQuery, variables: {paging}}
    ).pipe(
      share(),
      map(res => res.data)
    ).subscribe(res => {
        const {tasksForFuture} = res;
        this.#upcomingTasks$.next(tasksForFuture);
      }
    );
  }

  createTask(task: TaskItemInterface) {
    return this.apollo.mutate<TaskItemInterface>({
      mutation: this.taskQueries.createOneTaskInput,
      variables: {input: {task}}
    });
  }

}

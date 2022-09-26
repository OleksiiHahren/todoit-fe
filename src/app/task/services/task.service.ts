import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { BehaviorSubject, map, share } from 'rxjs';
import { TaskItemInterface } from '../interfaces/task-item.interface';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  readonly getTasksIncomeQuery = gql`
    query taskIncomes (
      $paging: Paging!
    ) {
      taskIncomes (paging: $paging) {
        name
        description
        project {
          name
        }
      }
    }
  `;
  readonly getTasksTodayQuery = gql`
    query tasksForToday (
      $paging: Paging!
    ) {
      tasksForToday (paging: $paging) {
        name
        description
        project {
          name
        }
      }
    }
  `;
  readonly createTaskMutation = gql`
    mutation createTaskWithAllDetails($data: taskInput!) {
      createTaskWithAllDetails(data: $data) {
        id
        name
      }
    }
  `;

  #incomeTasks$ = new BehaviorSubject<TaskItemInterface[]| null>(null);
  incomeTasks$ = this.#incomeTasks$.asObservable();
  #todayTasks$ = new BehaviorSubject<TaskItemInterface[]| null>(null);
  todayTasks$ = this.#todayTasks$.asObservable();

  #futureTasks$ = new BehaviorSubject<TaskItemInterface[]| null>(null);

  constructor(private apollo: Apollo) { }

  getAllIncomeTasks(paging = {limit: 10, offset: 0}) {
    return this.apollo.query<{taskIncomes: TaskItemInterface[]}>(
      {query: this.getTasksIncomeQuery, variables: {paging}}
    ).pipe(
      share(),
      map(res => res.data)
    ).subscribe(res => {
      const {taskIncomes} = res;
        this.#incomeTasks$.next(taskIncomes)
      }
    )
  }

  getAllTodayTasks(paging = {limit: 10, offset: 0}) {
    return this.apollo.query<{taskIncomes: TaskItemInterface[]}>(
      {query: this.getTasksTodayQuery, variables: {paging}}
    ).pipe(
      share(),
      map(res => res.data)
    ).subscribe(res => {
        const {taskIncomes} = res;
        this.#todayTasks$.next(taskIncomes)
      }
    )
  }

  createTask(data: TaskItemInterface) {
    return this.apollo.mutate<TaskItemInterface>({
      mutation: this.createTaskMutation,
      variables: {data}
    });
  }

}

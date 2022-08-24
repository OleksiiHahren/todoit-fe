import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { map } from 'rxjs';
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

  constructor(private apollo: Apollo) { }

  getAllIncomeTasks(paging = {limit: 10, offset: 0}) {
    return this.apollo.query<{taskIncomes: TaskItemInterface[]}>(
      {query: this.getTasksIncomeQuery, variables: {paging}}
    ).pipe(
      map(res => res.data)
    );
  }

}

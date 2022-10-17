import { gql } from 'apollo-angular';

export namespace taskQueries {
   export const getTasksIncomeQuery = gql`
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
  export  const getTasksTodayQuery = gql`
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
  export  const getTasksUpcomingQuery = gql`
  query tasksForFuture (
    $paging: Paging!
  ) {
    tasksForFuture (paging: $paging) {
      name
      description
      project {
        name
      }
    }
  }
`;
  export  const createTaskMutation = gql`
  mutation createTaskWithAllDetails($data: taskInput!) {
    createTaskWithAllDetails(data: $data) {
      id
      name
    }
  }
`;
}

import { gql } from 'apollo-angular';

export namespace ProjectQueries {
   export const getOwnProjects = gql`
  query getOwnProjects (
    $paging: Paging!
  ) {
    getOwnProjects (paging: $paging) {
      id
      name
      color
      favorite
    }
  }
`;

  export const getFavoriteProjects = gql`
    query getFavoriteProjects (
      $paging: Paging!
    ) {
      getFavoriteProjects (paging: $paging) {
        id
        name
        color
        favorite
      }
    }
  `;

  export const getProjectWithDetails = gql`
    query project (
      $id: ID!
    ) {
      project (id: $id) {
        id
        name
        color
        favorite
        tasks (
          filter: {
            status: {neq: "done"}
          }
          sorting: {
            field: updatedAt
            direction: ASC
          }

        ){
          name
          description
          priority
          deadline
        }
      }
    }
  `;

  export  const updateOneProject = gql`
    mutation updateOneProject($input: UpdateOneProjectInput!) {
      updateOneProject(input: $input) {
        id
        name
        favorite
        color
      }
    }
  `;

  export  const createOneProject = gql`
  mutation createOneProject($input: CreateOneProjectInput!) {
    createOneProject(input: $input) {
      id
      name
      favorite
      color
    }
  }
`;

  export  const deleteOneProject = gql`
    mutation deleteOneProject($input: DeleteOneProjectInput!) {
      deleteMyProject(input: $input) {
        id
      }
    }
  `;
}

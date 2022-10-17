import { gql } from 'apollo-angular';

export namespace ProjectQueries {
   export const getOwnProjects = gql`
  query getOwnProjects (
    $paging: Paging!
  ) {
    getOwnProjects (paging: $paging) {
      name
      color
    }
  }
`;

  export const getFavoriteProjects = gql`
    query getFavoriteProjects (
      $paging: Paging!
    ) {
      getFavoriteProjects (paging: $paging) {
        name
        color
      }
    }
  `;

  export  const updateOneProject = gql`
    mutation updateOneProject($data: UpdateOneProjectInput!) {
      updateOneProject(data: $data) {
        id
        name
        favorite
        color
      }
    }
  `;

  export  const createOneProject = gql`
  mutation createOneProject($data: CreateOneProjectInput!) {
    createOneProject(data: $data) {
      id
      name
      favorite
      color
    }
  }
`;

  export  const deleteOneProject = gql`
    mutation deleteOneProject($data: DeleteOneProjectInput!) {
      deleteMyProject(data: $data) {
        id
      }
    }
  `;
}

import { gql } from 'apollo-angular';

export namespace GlobalSearchQuery {
  export const searchAllSameItems = gql`
    query searchAllSameItems (
      $searchValue: String!
    ) {
      searchAllSameItems (searchValue: $searchValue) {
        id
        name
        color
        type
        color
      }
    }
  `;

}

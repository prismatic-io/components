import { gql } from "graphql-request";

export const DEFAULT_USER_PAGE_SIZE = 50;

export const LIST_BRAND_LIBRARIES_QUERY = gql`
  query listBrandLibraries($brandId: ID!, $limit: Int, $page: Int) {
    brand(id: $brandId) {
      id
      name
      libraries(limit: $limit, page: $page) {
        total
        hasNextPage
        page
        limit
        items {
          id
          name
        }
      }
    }
  }
`;

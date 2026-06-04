import { gql } from "graphql-request";






export const POLL_PAGE_SIZE = 50;
export const MAX_POLL_PAGES = 20;
















export const POLL_ORDERS_QUERY = gql`
  query PollOrders($from: String!, $first: Int!, $after: String, $retailerId: ID) {
    orders(updatedOn: { from: $from }, first: $first, after: $after, retailerId: $retailerId) {
      edges {
        node {
          id
          ref
          type
          status
          createdOn
          updatedOn
        }
      }
      pageInfo {
        hasNextPage
        endCursor
      }
    }
  }
`;

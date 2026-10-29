import { gql } from "graphql-request";

export const POLL_PAGE_SIZE = 50;
export const MAX_POLL_PAGES = 20;

export const DEFAULT_BATCH_SIZE = 50;

export const LOOK_BACK_DATE_PATTERN = /^(\d{4})-(\d{2})-(\d{2})$/;

export const POLL_ORDERS_QUERY = gql`
  query PollOrders($from: DateTime!, $to: DateTime!, $first: Int!, $after: String, $retailerId: [Int!]) {
    orders(updatedOn: { from: $from, to: $to }, first: $first, after: $after, retailerId: $retailerId) {
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

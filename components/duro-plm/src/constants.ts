import type { PollResourceConfig } from "./types/PollResourceConfig";

export const GRAPHQL_EXAMPLE = `{
  components(libraryType: GENERAL) {
    connection(
      first: 10
    ) {
      totalCount
      edges {
        cursor
        node {
          id
          name
          created
          lastModified
        }
      }
    }
  }
}`;

export const N_FIRST_RESULTS_FALLBACK = 100;

export const POLL_PAGE_SIZE = 100;

export const MAX_POLL_PAGES = 50;

export const TRIGGER_BATCH_SIZE = 50;

export const LOOK_BACK_DATE_PATTERN = /^(\d{4})-(\d{2})-(\d{2})$/;

export const POLL_RESOURCE_CONFIG: Record<string, PollResourceConfig> = {
  components: {
    query: `
      query PollComponents($first: Int, $after: String, $libraryType: LibraryType, $orderBy: [ComponentsOrderByInput]) {
        components(libraryType: $libraryType, orderBy: $orderBy) {
          connection(first: $first, after: $after) {
            edges {
              cursor
              node {
                id
                name
                created
                lastModified
              }
            }
            pageInfo {
              hasNextPage
              endCursor
            }
          }
        }
      }
    `,
    dataPath: ["components", "connection"],
    buildVariables: (first, after) => ({
      first,
      after,
      libraryType: "GENERAL",
      orderBy: [{ lastModified: "desc" }],
    }),
    earlyStop: true,
  },
  changeOrders: {
    query: `
      query PollChangeOrders($first: Int, $after: String, $orderBy: [ChangeOrdersOrderByInput]) {
        changeOrders(orderBy: $orderBy) {
          connection(first: $first, after: $after) {
            edges {
              cursor
              node {
                id
                name
                status
                type
                created
                lastModified
              }
            }
            pageInfo {
              hasNextPage
              endCursor
            }
          }
        }
      }
    `,
    dataPath: ["changeOrders", "connection"],
    buildVariables: (first, after) => ({
      first,
      after,
      orderBy: [{ lastModified: "desc" }],
    }),
    earlyStop: true,
  },
};

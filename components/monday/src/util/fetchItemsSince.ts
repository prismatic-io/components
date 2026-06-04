import { type GraphQLClient, gql } from "graphql-request";
import { MAX_LIMIT } from "../constants";
import type { MondayItem } from "../types/PollingState";






const POLL_ITEMS_QUERY = gql`
  query PollItemsByBoard($boardId: ID!, $compareValue: CompareValue!, $limit: Int!) {
    boards(ids: [$boardId]) {
      items_page(
        limit: $limit
        query_params: {
          rules: [
            {
              column_id: "__last_updated__"
              compare_value: $compareValue
              compare_attribute: "UPDATED_AT"
              operator: greater_than_or_equals
            }
          ]
        }
      ) {
        cursor
        items {
          id
          name
          created_at
          updated_at
          state
        }
      }
    }
  }
`;

const NEXT_PAGE_QUERY = gql`
  query NextItemsPage($cursor: String!, $limit: Int!) {
    next_items_page(cursor: $cursor, limit: $limit) {
      cursor
      items {
        id
        name
        created_at
        updated_at
        state
      }
    }
  }
`;

interface ItemsPageResponse {
  boards?: Array<{
    items_page?: {
      cursor: string | null;
      items: MondayItem[];
    };
  }>;
}

interface NextItemsPageResponse {
  next_items_page?: {
    cursor: string | null;
    items: MondayItem[];
  };
}





export const fetchAllItemsSince = async (
  client: GraphQLClient,
  boardId: number,
  sinceDateIso: string,
): Promise<MondayItem[]> => {
  const datePart = sinceDateIso.split("T")[0];
  const compareValue = ["EXACT", datePart];
  const items: MondayItem[] = [];

  const firstPage = await client.request<ItemsPageResponse>(POLL_ITEMS_QUERY, {
    boardId,
    compareValue,
    limit: MAX_LIMIT,
  });
  const firstPageData = firstPage.boards?.[0]?.items_page;
  if (firstPageData?.items?.length) {
    items.push(...firstPageData.items);
  }
  let cursor: string | null = firstPageData?.cursor ?? null;

  while (cursor) {
    const nextPage: NextItemsPageResponse = await client.request(
      NEXT_PAGE_QUERY,
      { cursor, limit: MAX_LIMIT },
    );
    if (nextPage.next_items_page?.items?.length) {
      items.push(...nextPage.next_items_page.items);
    }
    cursor = nextPage.next_items_page?.cursor ?? null;
  }

  return items;
};






export const partitionItemsByTimestamp = (
  items: MondayItem[],
  sinceDate: Date,
): { created: MondayItem[]; updated: MondayItem[] } => {
  const created: MondayItem[] = [];
  const updated: MondayItem[] = [];

  for (const item of items) {
    const createdAt = item.created_at ? new Date(item.created_at) : null;
    const updatedAt = item.updated_at ? new Date(item.updated_at) : null;

    if (createdAt && createdAt > sinceDate) {
      created.push(item);
    } else if (updatedAt && updatedAt > sinceDate) {
      updated.push(item);
    } else if (!createdAt && !updatedAt) {
      updated.push(item);
    }
  }

  return { created, updated };
};

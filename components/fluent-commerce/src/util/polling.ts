import type { Connection } from "@prismatic-io/spectral";
import type { Variables } from "graphql-request";
import { createFluentClient } from "../client";
import { POLL_ORDERS_QUERY, POLL_PAGE_SIZE } from "../constants";
import type {
  FluentOrder,
  FluentOrderChange,
  FluentOrderChangesObject,
  PollingWindow,
  RelayOrdersResponse,
} from "../types";

export const fetchFluentOrdersInWindow = async (
  connection: Connection,
  window: PollingWindow,
  retailerId: number | undefined,
  maxPages: number,
): Promise<{
  records: FluentOrder[];
  truncated: boolean;
  after: string | null;
}> => {
  const client = await createFluentClient(connection);
  const records: FluentOrder[] = [];
  let after = window.after;
  for (let page = 0; page < maxPages; page++) {
    const variables: Variables = {
      from: window.from,
      to: window.to,
      first: POLL_PAGE_SIZE,
      after,
      retailerId: retailerId || null,
    };
    const data = (await client.request(
      POLL_ORDERS_QUERY,
      variables,
    )) as RelayOrdersResponse;
    const edges = data?.orders?.edges ?? [];
    for (const edge of edges) {
      if (edge?.node) records.push(edge.node);
    }
    const pageInfo = data?.orders?.pageInfo;
    if (!pageInfo?.hasNextPage) {
      return { records, truncated: false, after: null };
    }
    if (!pageInfo.endCursor) {
      throw new Error(
        "Fluent reported more orders but returned no endCursor to continue from.",
      );
    }
    after = pageInfo.endCursor;
  }
  return { records, truncated: true, after };
};

export const resolveFluentOrderChanges = (
  data: FluentOrderChangesObject | undefined,
): FluentOrderChange[] => {
  const changesObject = data ?? { created: [], updated: [] };
  return [
    ...(changesObject.created ?? []).map(
      (record): FluentOrderChange => ({ changeType: "created", record }),
    ),
    ...(changesObject.updated ?? []).map(
      (record): FluentOrderChange => ({ changeType: "updated", record }),
    ),
  ];
};

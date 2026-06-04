import { type Connection, util } from "@prismatic-io/spectral";
import type { Variables } from "graphql-request";
import { createFluentClient } from "./client";
import { MAX_POLL_PAGES, POLL_ORDERS_QUERY, POLL_PAGE_SIZE } from "./constants";
import type { FluentOrder, RelayOrdersResponse } from "./types";

export const toOptionalString = (value: unknown): string | undefined =>
  util.types.toString(value) || undefined;







export const fetchFluentOrdersSince = async (
  connection: Connection,
  lastPolledAt: string,
  retailerId: string | undefined,
  debug: boolean,
): Promise<{ records: FluentOrder[]; truncated: boolean }> => {
  const client = await createFluentClient(connection, debug);
  const records: FluentOrder[] = [];
  let after: string | null = null;
  for (let page = 0; page < MAX_POLL_PAGES; page++) {
    const variables: Variables = {
      from: lastPolledAt,
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
      return { records, truncated: false };
    }
    after = pageInfo.endCursor;
  }
  return { records, truncated: true };
};

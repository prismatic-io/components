import { type Connection, util } from "@prismatic-io/spectral";
import type { Variables } from "graphql-request";
import { createFluentClient } from "./client";
import {
  LOOK_BACK_DATE_PATTERN,
  MAX_POLL_PAGES,
  POLL_ORDERS_QUERY,
  POLL_PAGE_SIZE,
} from "./constants";
import type {
  FluentCommerceChangesObject,
  FluentCommerceRecordChange,
  FluentOrder,
  RelayOrdersResponse,
} from "./types";
export const toOptionalString = (value: unknown): string | undefined =>
  util.types.toString(value) || undefined;
export const fetchFluentOrdersSince = async (
  connection: Connection,
  since: string,
  retailerId: string | undefined,
  debug: boolean,
  startAfter: string | null = null,
  maxPages: number = MAX_POLL_PAGES,
): Promise<{
  records: FluentOrder[];
  truncated: boolean;
  endCursor: string | null;
}> => {
  const client = await createFluentClient(connection, debug);
  const records: FluentOrder[] = [];
  let after: string | null = startAfter;
  for (let page = 0; page < maxPages; page++) {
    const variables: Variables = {
      from: since,
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
      return {
        records,
        truncated: false,
        endCursor: pageInfo?.endCursor ?? after,
      };
    }
    after = pageInfo.endCursor;
  }
  return { records, truncated: true, endCursor: after };
};
export const resolvePollingRecordChanges = (
  data: FluentCommerceChangesObject | undefined,
): FluentCommerceRecordChange[] => {
  const changesObject = data ?? {};
  return [
    ...(changesObject.created ?? []).map(
      (record): FluentCommerceRecordChange => ({
        changeType: "created",
        record,
      }),
    ),
    ...(changesObject.updated ?? []).map(
      (record): FluentCommerceRecordChange => ({
        changeType: "updated",
        record,
      }),
    ),
  ];
};
export const lookBackDateClean = (value: unknown): string => {
  if (
    value === undefined ||
    value === null ||
    (typeof value === "string" && value.trim() === "")
  ) {
    return "";
  }
  const raw = typeof value === "string" ? value.trim() : String(value);
  const match =
    typeof value === "string" ? raw.match(LOOK_BACK_DATE_PATTERN) : null;
  if (!match) {
    throw new Error(
      `Look-back Date must be a date in YYYY-MM-DD format. Received: ${raw}`,
    );
  }
  const [, yearStr, monthStr, dayStr] = match;
  const year = Number(yearStr);
  const month = Number(monthStr);
  const day = Number(dayStr);
  const parsed = new Date(Date.UTC(year, month - 1, day));
  if (
    parsed.getUTCFullYear() !== year ||
    parsed.getUTCMonth() !== month - 1 ||
    parsed.getUTCDate() !== day
  ) {
    throw new Error(
      `Look-back Date must be a date in YYYY-MM-DD format. Received: ${raw}`,
    );
  }
  if (parsed.getTime() > Date.now()) {
    throw new Error(`Look-back Date cannot be a future date. Received: ${raw}`);
  }
  return parsed.toISOString();
};

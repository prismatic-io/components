import {
  type ActionInputParameters,
  type PollingContext,
  type TriggerPayload,
  util,
} from "@prismatic-io/spectral";
import type { GraphQLClient } from "graphql-request";
import { getShopifyGraphQlClient } from "../client";
import { LOOK_BACK_DATE_PATTERN, POLLING_LIMIT } from "../constants";
import type { customersPollingTriggerInputs } from "../inputs";
import type {
  PageInfo,
  PollingChangesObject,
  PollingCursor,
  PollingCycleResult,
  PollingPage,
  PollingRecordChange,
  PollingResource,
  PollingState,
} from "../types";
import { fetchData } from "./pagination";
import { buildPollingWindowQuery, resolvePollingCursor } from "./pollingWindow";

export const categorizeByChangeType = <T extends { createdAt: string }>(
  items: T[],
  lastPolledAt: string,
): PollingChangesObject<T> =>
  items.reduce<PollingChangesObject<T>>(
    (acc, item) => {
      if (new Date(item.createdAt) >= new Date(lastPolledAt)) {
        acc.created.push(item);
      } else {
        acc.updated.push(item);
      }
      return acc;
    },
    { created: [], updated: [] },
  );

export const resolvePollingRecordChanges = <T>(
  data: PollingChangesObject<T> | undefined,
): PollingRecordChange<T>[] => {
  const changesObject = data ?? { created: [], updated: [] };
  return [
    ...(changesObject.created ?? []).map(
      (record): PollingRecordChange<T> => ({ changeType: "created", record }),
    ),
    ...(changesObject.updated ?? []).map(
      (record): PollingRecordChange<T> => ({ changeType: "updated", record }),
    ),
  ];
};

export const lookBackDateClean = (value: unknown): string => {
  if (value === undefined || value === null || (typeof value === "string" && value.trim() === "")) {
    return "";
  }

  const raw = typeof value === "string" ? value.trim() : util.types.toString(value);
  const match = typeof value === "string" ? raw.match(LOOK_BACK_DATE_PATTERN) : null;
  if (!match) {
    throw new Error(`Look-back Date must be a date in YYYY-MM-DD format. Received: ${raw}`);
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
    throw new Error(`Look-back Date must be a date in YYYY-MM-DD format. Received: ${raw}`);
  }

  if (parsed.getTime() > Date.now()) {
    throw new Error(`Look-back Date cannot be a future date. Received: ${raw}`);
  }
  return parsed.toISOString();
};

const fetchPollingPage = async <T>(
  client: GraphQLClient,
  resource: PollingResource,
  cursor: PollingCursor,
): Promise<PollingPage<T>> => {
  const data = (await fetchData<T>(
    client,
    [resource.listKey],
    resource.listKey,
    false,
    resource.query,
    {
      first: POLLING_LIMIT,
      query: buildPollingWindowQuery(cursor),
      cursor: cursor.after,
    },
  )) as Record<string, T[]> & { pageInfo: PageInfo };

  return {
    records: data?.[resource.listKey] ?? [],
    hasNextPage: data?.pageInfo?.hasNextPage ?? false,
    endCursor: data?.pageInfo?.endCursor,
  };
};

export const runPollingCycle = async <T extends { createdAt: string }>(
  context: PollingContext,
  payload: TriggerPayload,
  params: ActionInputParameters<typeof customersPollingTriggerInputs>,
  resource: PollingResource,
): Promise<PollingCycleResult> => {
  const now = new Date().toISOString();
  const state = (context.polling.getState() ?? {}) as PollingState;

  const cursor = resolvePollingCursor({
    incoming: payload.paginationState as PollingCursor | undefined,
    state,
    lookBackDate: params.lookBackDate,
    now,
  });

  context.logger.debug(
    `Polling window [${cursor.windowStart}, ${cursor.windowEnd})${
      cursor.isBackfill ? " (initial sync)" : ""
    }`,
  );

  const windowIsEmpty = cursor.windowStart >= cursor.windowEnd;
  const page = windowIsEmpty
    ? { records: [] as T[], hasNextPage: false, endCursor: undefined }
    : await fetchPollingPage<T>(
        getShopifyGraphQlClient(
          params.shopifyConnection,
          undefined,
          context.debug.enabled,
          context.logger,
        ),
        resource,
        cursor,
      );

  const isFinalPage = !page.hasNextPage;
  const nextCursor: PollingCursor | undefined = isFinalPage
    ? undefined
    : { ...cursor, after: page.endCursor };

  context.polling.setState(
    isFinalPage
      ? { lastPolledAt: cursor.windowEnd }
      : { lastPolledAt: state.lastPolledAt ?? cursor.windowStart, cursor: nextCursor },
  );

  return {
    payload: {
      ...payload,
      paginationState: nextCursor,
      body: { data: categorizeByChangeType(page.records, cursor.windowStart) },
    },
    polledNoChanges: page.records.length === 0 && !nextCursor && !payload.paginationState,
  };
};

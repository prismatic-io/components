import { URL } from "node:url";
import { type Connection, ConnectionError, util } from "@prismatic-io/spectral";
import type { HttpClient } from "@prismatic-io/spectral/dist/clients/http";
import { squareConnection } from "../connections";
import {
  BATCHED_MAX_PAGES_PER_POLL,
  BATCHED_PAYMENTS_PAGE_SIZE,
  LOOK_BACK_DATE_PATTERN,
  MAX_PAGES_PER_POLL,
  PAYMENTS_PAGE_SIZE,
  SQUARE_API_VERSION,
} from "../constants";
import type {
  Payment,
  PaymentChange,
  PaymentChangesObject,
  PollingBoundary,
  PollingCursor,
  PollingState,
} from "../types";

export const validateConnection = (connection: Connection): void => {
  if (connection.key !== squareConnection.key) {
    throw new ConnectionError(connection, "Unknown Connection type provided.");
  }
};

export const getBaseUrl = (connection: Connection): string => {
  const { tokenUrl } = connection.fields;
  const validatedTokenUrl = util.types.toString(tokenUrl);
  const { hostname, protocol } = new URL(validatedTokenUrl);
  const baseUrl = `${protocol}//${hostname}`;
  return baseUrl;
};

export const getAuthToken = (connection: Connection) => {
  return connection?.token?.access_token;
};

export const getAuthHeaders = (connection: Connection, version?: string) => {
  const token = getAuthToken(connection);
  const apiVersion =
    version ||
    (connection.fields.apiVersion
      ? util.types.toString(connection.fields.apiVersion)
      : SQUARE_API_VERSION);

  return {
    Authorization: `Bearer ${token}`,
    "Square-Version": apiVersion,
    "Content-Type": "application/json",
  };
};

export const fetchAllPages = async (
  client: HttpClient,
  endpoint: string,
  dataKey: string,
  options?: {
    method?: "GET" | "POST";
    additionalParams?: Record<string, unknown>;
    initialCursor?: unknown;
  },
  fetchAll = true,
) => {
  let allItems: Record<string, unknown>[] = [];
  let cursor: string | undefined =
    options?.initialCursor !== undefined && options.initialCursor !== ""
      ? util.types.toString(options.initialCursor)
      : undefined;
  let lastResponse: Record<string, unknown> = {};
  const method = options?.method || "GET";
  const additionalParams = options?.additionalParams || {};

  do {
    const { data } =
      method === "POST"
        ? await client.post(endpoint, {
            ...additionalParams,
            cursor,
          })
        : await client.get(endpoint, {
            params: {
              ...additionalParams,
              cursor,
            },
          });

    const items = data[dataKey] || [];
    allItems = allItems.concat(items);
    cursor = data.cursor;
    lastResponse = data;
  } while (fetchAll && cursor);

  return {
    ...lastResponse,
    [dataKey]: allItems,
  };
};

export const toOptionalString = (value: unknown): string | undefined =>
  value ? util.types.toString(value) : undefined;

export const toOptionalNumber = (value: unknown): number | undefined =>
  value ? util.types.toNumber(value) : undefined;

export const sortByLabel = (
  a: { label: string },
  b: { label: string },
): number => {
  if (a.label < b.label) return -1;
  if (a.label > b.label) return 1;
  return 0;
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

const toMillis = (value: string | undefined): number | undefined => {
  if (!value) return undefined;
  const millis = Date.parse(value);
  return Number.isNaN(millis) ? undefined : millis;
};

export const windowStartFor = (watermark: string): string =>
  new Date(
    Math.floor(Date.parse(watermark) / 1000) * 1000 - 1000,
  ).toISOString();

export const fetchPaymentsWindow = async (
  client: HttpClient,
  beginTime: string,
  startCursor: string | undefined,
  pageSize: number,
  maxPages: number,
): Promise<{ payments: Payment[]; afterCursor: string | undefined }> => {
  const payments: Payment[] = [];
  let cursor = startCursor;
  for (let page = 0; page < maxPages; page++) {
    const { data } = await client.get("/v2/payments", {
      params: {
        updated_at_begin_time: beginTime,
        sort_field: "UPDATED_AT",
        sort_order: "ASC",
        limit: pageSize,
        cursor,
      },
    });
    payments.push(...((data.payments as Payment[] | undefined) ?? []));
    cursor = data.cursor || undefined;
    if (!cursor) break;
  }
  return { payments, afterCursor: cursor };
};

export const selectUndelivered = (
  payments: Payment[],
  watermark: string,
  deliveredIds: string[],
): Payment[] => {
  const watermarkMs = Date.parse(watermark);
  const delivered = new Set(deliveredIds);
  return payments.filter((payment) => {
    const updatedMs = toMillis(payment.updated_at);
    if (updatedMs === undefined) return true;
    if (updatedMs < watermarkMs) return false;
    return !(
      updatedMs === watermarkMs &&
      payment.id !== undefined &&
      delivered.has(payment.id)
    );
  });
};

export const advanceBoundary = (
  boundary: PollingBoundary,
  payments: Payment[],
): PollingBoundary => {
  let watermarkMs = Date.parse(boundary.watermark);
  let ids = new Set(boundary.ids);
  for (const payment of payments) {
    const updatedMs = toMillis(payment.updated_at);
    if (updatedMs === undefined || payment.id === undefined) continue;
    if (updatedMs > watermarkMs) {
      watermarkMs = updatedMs;
      ids = new Set([payment.id]);
    } else if (updatedMs === watermarkMs) {
      ids.add(payment.id);
    }
  }
  return { watermark: new Date(watermarkMs).toISOString(), ids: [...ids] };
};

export const partitionPaymentsByCreation = (
  payments: Payment[],
  watermark: string,
): { created: Payment[]; updated: Payment[] } => {
  const watermarkMs = Date.parse(watermark);
  const created: Payment[] = [];
  const updated: Payment[] = [];
  for (const payment of payments) {
    const createdMs = toMillis(payment.created_at);
    if (createdMs !== undefined && createdMs >= watermarkMs) {
      created.push(payment);
    } else {
      updated.push(payment);
    }
  }
  return { created, updated };
};

export interface PollingCycleResult {
  created: Payment[];
  updated: Payment[];
  state: PollingState;
  next: PollingCursor | null;
  backfill: boolean;
  read: number;
}

export const pollPaymentsCycle = async (args: {
  client: HttpClient;
  state: PollingState;
  incoming: PollingCursor | undefined;
  seed: Date;
  hasLookBackDate: boolean;
  batching: boolean;
}): Promise<PollingCycleResult> => {
  const { client, state, incoming, seed, hasLookBackDate, batching } = args;
  const resume = incoming ?? state.cursor;
  const committedAt = state.lastPolledAt ?? seed.toISOString();
  const committed: PollingBoundary = {
    watermark: committedAt,
    ids: state.boundaryIds ?? [],
  };
  const windowStart = resume?.windowStart ?? windowStartFor(committedAt);

  const { payments, afterCursor } = await fetchPaymentsWindow(
    client,
    windowStart,
    resume?.afterCursor,
    batching ? BATCHED_PAYMENTS_PAGE_SIZE : PAYMENTS_PAGE_SIZE,
    batching ? BATCHED_MAX_PAGES_PER_POLL : MAX_PAGES_PER_POLL,
  );

  const fresh = selectUndelivered(payments, committedAt, committed.ids);
  const { created, updated } = partitionPaymentsByCreation(fresh, committedAt);
  const pending = advanceBoundary(resume?.pending ?? committed, payments);
  const backfill =
    state.backfillActive === true || (!state.lastPolledAt && hasLookBackDate);

  const next: PollingCursor | null = afterCursor
    ? { afterCursor, windowStart, pending }
    : null;
  const nextState: PollingState = next
    ? {
        lastPolledAt: committedAt,
        boundaryIds: committed.ids,
        cursor: next,
        ...(backfill ? { backfillActive: true } : {}),
      }
    : { lastPolledAt: pending.watermark, boundaryIds: pending.ids };

  return {
    created,
    updated,
    state: nextState,
    next,
    backfill,
    read: payments.length,
  };
};

export const resolvePaymentChanges = (
  data: PaymentChangesObject | undefined,
): PaymentChange[] => {
  const changes = data ?? {};
  return [
    ...(changes.created ?? []).map(
      (record): PaymentChange => ({ changeType: "created", record }),
    ),
    ...(changes.updated ?? []).map(
      (record): PaymentChange => ({ changeType: "updated", record }),
    ),
  ];
};

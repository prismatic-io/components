import {
  type Connection,
  ConnectionError,
  type KeyValuePair,
  util,
} from "@prismatic-io/spectral";
import type { HttpClient } from "@prismatic-io/spectral/dist/clients/http";
import { URL } from "url";
import { basic } from "./connections";
import {
  MAX_EXCLUDE_IDS,
  MAX_POLL_PAGES,
  POLL_PAGE_SIZE,
  WATERMARK_SKEW_MARGIN_MS,
} from "./constants";
import type {
  DrainResult,
  DrainRound,
  FetchPollPage,
  PollCursor,
  PollingChangesObject,
  PollingRecordChange,
  PollingState,
  PollPageQuery,
  PollWindow,
  WooCommerceRecord,
} from "./types";
export const validateConnection = (connection: Connection) => {
  if (![basic.key].includes(connection.key)) {
    throw new ConnectionError(
      connection,
      `Unsupported connection: ${connection?.key}.`,
    );
  }
};
export const getBaseUrl = (connection: Connection): string => {
  const domain = cleanDomain(util.types.toString(connection.fields.domain));
  return `https://${domain}/wp-json/wc/v3`;
};
export const cleanDomain = (domain: string): string => {
  if (domain.startsWith("https://")) {
    const { host } = new URL(domain);
    return host;
  }
  const { host } = new URL(`https://${domain}`);
  return host;
};
export const getAuthorization = (connection: Connection) => {
  if (connection.key === basic.key) {
    const token = Buffer.from(
      `${util.types.toString(connection?.fields.username)}:${util.types.toString(connection?.fields.password)}`,
    ).toString("base64");
    return `Basic ${token}`;
  }
  return `Bearer ${util.types.toString(connection?.token?.access_token)}`;
};
export const cleanStringInput = (value: unknown) =>
  value ? util.types.toString(value) : undefined;
export const cleanKeyValPairListInput = (value: unknown) => {
  const data = util.types.keyValPairListToObject(
    value as KeyValuePair<unknown>[],
  );
  if (Object.keys(data).length === 0) {
    return {};
  }
  return data;
};
export const paginateRecords = async (
  httpClient: HttpClient,
  url: string,
  params: Record<string, unknown>,
  fetchAll = false,
) => {
  const records = [];
  if (fetchAll) {
    const { data, headers } = await httpClient.get(url, {
      params: {
        ...params,
        page: 1,
      },
    });
    records.push(...data);
    const nextPage = headers["x-wp-totalpages"] || headers["X-WP-TotalPages"];
    if (nextPage) {
      const nextPageNumber = util.types.toNumber(nextPage);
      const pages = await Promise.all(
        Array.from({ length: nextPageNumber - 1 }, (_, i) =>
          httpClient.get(url, {
            params: {
              ...params,
              page: i + 2,
            },
          }),
        ),
      );
      records.push(...pages.flatMap((page) => page.data));
    }
    return {
      data: records,
      headers,
    };
  }
  const { data, headers } = await httpClient.get(url, {
    params,
  });
  return {
    data,
    headers,
  };
};
const SECOND_MS = 1000;
const POLL_LABEL = "New Records";
const toIso = (epochMs: number): string => new Date(epochMs).toISOString();
const truncateToSecond = (iso: string): string =>
  toIso(Math.floor(new Date(iso).getTime() / SECOND_MS) * SECOND_MS);
const resolveSafeHorizon = (now: string): string =>
  truncateToSecond(toIso(new Date(now).getTime() - WATERMARK_SKEW_MARGIN_MS));
const toWooDate = (epochMs: number): string => toIso(epochMs).slice(0, 19);
const fetchWooPage =
  (client: HttpClient, endpoint: string): FetchPollPage =>
  async ({ afterMs, beforeMs, exclude }: PollPageQuery) => {
    const { data } = await client.get<WooCommerceRecord[]>(endpoint, {
      params: {
        after: toWooDate(afterMs),
        before: toWooDate(beforeMs),
        dates_are_gmt: true,
        ...(exclude.length > 0 ? { exclude: exclude.join(",") } : {}),
        per_page: POLL_PAGE_SIZE,
        page: 1,
        orderby: "date",
        order: "asc",
      },
    });
    return data;
  };
const createdSecond = (record: WooCommerceRecord): number | null => {
  const gmt = record.date_created_gmt;
  if (typeof gmt !== "string") {
    return null;
  }
  const at = new Date(/Z$|[+-]\d{2}:\d{2}$/.test(gmt) ? gmt : `${gmt}Z`);
  return Number.isNaN(at.getTime())
    ? null
    : Math.floor(at.getTime() / SECOND_MS) * SECOND_MS;
};
const sameCursor = (left: PollCursor, right: PollCursor): boolean =>
  JSON.stringify(left) === JSON.stringify(right);
const noProgress = (cursor: PollCursor): Error =>
  new Error(
    `${POLL_LABEL} made no progress: a full page of ${POLL_PAGE_SIZE} records came back at ${cursor.watermark} and the cursor did not move, so every later request would return the same page. The cursor is left where it was.`,
  );
const normalRound = async (
  fetchPage: FetchPollPage,
  cursor: PollCursor,
  horizon: string,
): Promise<DrainRound> => {
  const watermarkMs = Date.parse(cursor.watermark);
  const horizonMs = Date.parse(horizon);
  if (watermarkMs > horizonMs) {
    return { delivered: [], cursor, drained: true };
  }
  const batch = await fetchPage({
    afterMs: watermarkMs - SECOND_MS,
    beforeMs: horizonMs + SECOND_MS,
    exclude: [],
  });
  const boundary = new Set(cursor.boundaryIds);
  const delivered: WooCommerceRecord[] = [];
  let latestMs = watermarkMs;
  let latestIds: number[] = [];
  for (const record of batch) {
    const at = createdSecond(record);
    if (at === null) {
      delivered.push(record);
      continue;
    }
    if (at < watermarkMs) {
      continue;
    }
    if (!(at === watermarkMs && boundary.has(record.id))) {
      delivered.push(record);
    }
    if (at > latestMs) {
      latestMs = at;
      latestIds = [record.id];
    } else if (at === latestMs) {
      latestIds.push(record.id);
    }
  }
  const stuck = latestMs === watermarkMs;
  const next: PollCursor = stuck
    ? {
        watermark: cursor.watermark,
        boundaryIds: [...new Set([...cursor.boundaryIds, ...latestIds])],
      }
    : { watermark: toIso(latestMs), boundaryIds: latestIds };
  if (batch.length < POLL_PAGE_SIZE) {
    return { delivered, cursor: next, drained: true };
  }
  if (stuck && latestIds.length === 0) {
    throw noProgress(cursor);
  }
  return {
    delivered,
    cursor: stuck ? { ...next, tieGroup: {} } : next,
    drained: false,
  };
};
const tieRound = async (
  fetchPage: FetchPollPage,
  cursor: PollCursor,
  horizon: string,
): Promise<DrainRound> => {
  if (cursor.boundaryIds.length > MAX_EXCLUDE_IDS) {
    throw new Error(
      `${POLL_LABEL} cannot drain the records created at ${cursor.watermark}: ${cursor.boundaryIds.length} are already delivered and WooCommerce documents no way to page inside one second, so the exclude list would pass its cap of ${MAX_EXCLUDE_IDS}. The cursor stays at ${cursor.watermark}, nothing is lost, and every later poll stops here until a maintainer acts.`,
    );
  }
  const watermarkMs = Date.parse(cursor.watermark);
  const batch = await fetchPage({
    afterMs: watermarkMs - SECOND_MS,
    beforeMs: watermarkMs + SECOND_MS,
    exclude: cursor.boundaryIds,
  });
  const boundary = new Set(cursor.boundaryIds);
  const delivered: WooCommerceRecord[] = [];
  let pastWindow = false;
  for (const record of batch) {
    const at = createdSecond(record);
    if (at !== null && at > watermarkMs) {
      pastWindow = true;
    }
    if ((at !== null && at !== watermarkMs) || boundary.has(record.id)) {
      continue;
    }
    delivered.push(record);
    boundary.add(record.id);
  }
  if (batch.length >= POLL_PAGE_SIZE && !pastWindow) {
    const next: PollCursor = {
      watermark: cursor.watermark,
      boundaryIds: [...boundary],
      tieGroup: {},
    };
    if (sameCursor(next, cursor)) {
      throw noProgress(cursor);
    }
    return { delivered, cursor: next, drained: false };
  }
  if (watermarkMs < Date.parse(horizon)) {
    return {
      delivered,
      cursor: { watermark: toIso(watermarkMs + SECOND_MS), boundaryIds: [] },
      drained: false,
    };
  }
  return {
    delivered,
    cursor: { watermark: cursor.watermark, boundaryIds: [...boundary] },
    drained: true,
  };
};
const drainWatermark = async (
  fetchPage: FetchPollPage,
  start: PollCursor,
  horizon: string,
  maxPages: number,
): Promise<DrainResult> => {
  const records: WooCommerceRecord[] = [];
  let cursor = start;
  for (let page = 0; page < maxPages; page++) {
    const round = cursor.tieGroup
      ? await tieRound(fetchPage, cursor, horizon)
      : await normalRound(fetchPage, cursor, horizon);
    records.push(...round.delivered);
    cursor = round.cursor;
    if (round.drained) {
      return { records, cursor, drained: true };
    }
  }
  return { records, cursor, drained: false };
};
const resolveStartCursor = (
  state: PollingState | null | undefined,
  incoming: PollCursor | undefined,
  lookBackDate: string | undefined,
  now: string,
): PollCursor =>
  incoming ??
  state?.cursor ?? {
    watermark: truncateToSecond(state?.lastPolledAt || lookBackDate || now),
    boundaryIds: state?.lastPolledAt ? (state.boundaryIds ?? []) : [],
  };
const nextPollingState = (
  state: PollingState | null | undefined,
  start: PollCursor,
  result: DrainResult,
): PollingState => {
  if (result.drained) {
    return {
      lastPolledAt: result.cursor.watermark,
      boundaryIds: result.cursor.boundaryIds,
    };
  }
  return {
    lastPolledAt: state?.lastPolledAt ?? start.watermark,
    ...(state?.lastPolledAt && state.boundaryIds
      ? { boundaryIds: state.boundaryIds }
      : {}),
    cursor: result.cursor,
  };
};
export const pollWatermark = async (
  client: HttpClient,
  endpoint: string,
  input: {
    state: PollingState | null | undefined;
    incoming: PollCursor | undefined;
    lookBackDate: string | undefined;
    now: string;
    batching: boolean;
  },
): Promise<{
  result: DrainResult;
  nextState: PollingState;
}> => {
  const start = resolveStartCursor(
    input.state,
    input.incoming,
    input.lookBackDate,
    input.now,
  );
  const result = await drainWatermark(
    fetchWooPage(client, endpoint),
    start,
    resolveSafeHorizon(input.now),
    input.batching ? 1 : MAX_POLL_PAGES,
  );
  return { result, nextState: nextPollingState(input.state, start, result) };
};
export const fetchCustomersSince = async (
  client: HttpClient,
  endpoint: string,
  state: PollingState | null | undefined,
  lookBackDate: string | undefined,
  now: string,
): Promise<WooCommerceRecord[]> => {
  const window = resolvePollWindow(state, lookBackDate, now);
  const { data } = await paginateRecords(
    client,
    endpoint,
    {
      after: window.after,
      per_page: 100,
      orderby: "date",
      order: "asc",
    },
    true,
  );
  return trimToWindow(data, window);
};
const LOOK_BACK_DATE_PATTERN = /^(\d{4})-(\d{2})-(\d{2})$/;
const INITIAL_SYNC_SEED_MARGIN_MS = 24 * 60 * 60 * 1000;
export const lookBackDateClean = (value: unknown): string => {
  const raw = util.types.toString(value).trim();
  if (raw === "") {
    return "";
  }
  const match = raw.match(LOOK_BACK_DATE_PATTERN);
  if (!match) {
    throw new Error(
      `Look-back Date must be a date in YYYY-MM-DD format. Received: ${raw}`,
    );
  }
  const [, yearStr, monthStr, dayStr] = match;
  const year = util.types.toNumber(yearStr);
  const month = util.types.toNumber(monthStr);
  const day = util.types.toNumber(dayStr);
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
export const resolvePollWindow = (
  state: PollingState | null | undefined,
  lookBackDate: string | undefined,
  now: string,
): PollWindow => {
  if (state?.lastPolledAt) {
    return { after: state.lastPolledAt };
  }
  if (lookBackDate) {
    return {
      after: new Date(
        new Date(lookBackDate).getTime() - INITIAL_SYNC_SEED_MARGIN_MS,
      ).toISOString(),
      notBefore: lookBackDate,
    };
  }
  return { after: now };
};
export const trimToWindow = (
  records: WooCommerceRecord[],
  window: PollWindow,
): WooCommerceRecord[] => {
  if (!window.notBefore) {
    return records;
  }
  const notBefore = new Date(window.notBefore).getTime();
  return records.filter((record) => {
    const gmt = record.date_created_gmt;
    if (typeof gmt !== "string") {
      return true;
    }
    const createdAt = new Date(
      /Z$|[+-]\d{2}:\d{2}$/.test(gmt) ? gmt : `${gmt}Z`,
    ).getTime();
    return Number.isNaN(createdAt) || createdAt >= notBefore;
  });
};
export const resolvePollingRecordChanges = (
  data: PollingChangesObject | undefined,
): PollingRecordChange[] => {
  const changesObject = data ?? { created: [], updated: [] };
  return [
    ...(changesObject.created ?? []).map(
      (record): PollingRecordChange => ({ changeType: "created", record }),
    ),
    ...(changesObject.updated ?? []).map(
      (record): PollingRecordChange => ({ changeType: "updated", record }),
    ),
  ];
};

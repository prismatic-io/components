import type { createShipStationClient } from "../client";
import {
  MAX_POLL_PAGES,
  POLL_PAGE_SIZE,
  WATERMARK_SEED_MARGIN_MS,
  WATERMARK_SKEW_MARGIN_MS,
} from "../constants";
import type {
  DrainResult,
  FetchOrderPage,
  NormalRound,
  OrderPollCursor,
  OrderRecord,
  PollingChangesObject,
  PollingState,
  WatermarkWindow,
} from "../types";

const SECOND_MS = 1000;
const ZONE_LESS = /^(\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2})(?:\.\d+)?$/;

const toWall = (ms: number): string => new Date(ms).toISOString().slice(0, 19);

const toRequestTime = (ms: number): string => new Date(ms).toISOString();

const secondOf = (value: unknown): number | null => {
  if (typeof value !== "string") {
    return null;
  }
  const zoneLess = value.match(ZONE_LESS);
  const ms = Date.parse(zoneLess ? `${zoneLess[1]}Z` : value);
  return Number.isNaN(ms) ? null : Math.floor(ms / SECOND_MS) * SECOND_MS;
};

const normalizeWatermark = (value: string): string =>
  toWall(secondOf(value) ?? Date.now());

export const resolveSafeHorizon = (now: string): string =>
  toWall(Date.parse(now) - WATERMARK_SKEW_MARGIN_MS);

export const fetchOrdersPage =
  (client: ReturnType<typeof createShipStationClient>): FetchOrderPage =>
  async ({ modifyDateStart, modifyDateEnd }) => {
    const { data } = await client.get("/orders", {
      params: {
        modifyDateStart,
        modifyDateEnd,
        sortBy: "ModifyDate",
        sortDir: "ASC",
        pageSize: POLL_PAGE_SIZE,
      },
    });
    return Array.isArray(data?.orders) ? data.orders : [];
  };

const sameCursor = (a: OrderPollCursor, b: OrderPollCursor): boolean =>
  a.watermark === b.watermark &&
  a.boundaryIds.length === b.boundaryIds.length &&
  a.boundaryIds.every((id) => b.boundaryIds.includes(id));

const normalRound = async (
  name: string,
  fetchPage: FetchOrderPage,
  cursor: OrderPollCursor,
  horizon: string,
): Promise<NormalRound> => {
  const watermarkMs = secondOf(cursor.watermark) ?? 0;
  if (watermarkMs > (secondOf(horizon) ?? 0)) {
    return { delivered: [], cursor, drained: true, stuck: false };
  }
  const batch = await fetchPage({
    modifyDateStart: toRequestTime(watermarkMs - SECOND_MS),
    modifyDateEnd: toRequestTime(secondOf(horizon) ?? 0),
  });
  const full = batch.length >= POLL_PAGE_SIZE;
  const seconds = batch.map((record) => secondOf(record.modifyDate));
  if (full && seconds.every((at) => at === watermarkMs)) {
    return { delivered: [], cursor, drained: false, stuck: true };
  }

  const boundary = new Set(cursor.boundaryIds);
  const delivered: OrderRecord[] = [];
  let latestMs = watermarkMs;
  let latestIds: number[] = [];
  batch.forEach((record, index) => {
    const at = seconds[index];
    if (at === null) {
      delivered.push(record);
      return;
    }
    if (at < watermarkMs) {
      return;
    }
    if (!(at === watermarkMs && boundary.has(record.orderId))) {
      delivered.push(record);
    }
    if (at > latestMs) {
      latestMs = at;
      latestIds = [record.orderId];
    } else if (at === latestMs) {
      latestIds.push(record.orderId);
    }
  });

  const next: OrderPollCursor =
    latestMs === watermarkMs
      ? {
          watermark: cursor.watermark,
          boundaryIds: [...new Set([...cursor.boundaryIds, ...latestIds])],
        }
      : { watermark: toWall(latestMs), boundaryIds: latestIds };
  if (!full) {
    return { delivered, cursor: next, drained: true, stuck: false };
  }
  if (sameCursor(next, cursor)) {
    throw new Error(
      `${name}: no progress at ${cursor.watermark}. A full page of ${POLL_PAGE_SIZE} orders came back and none of them moved the position (each was already delivered or falls before it), so the same page would return on every poll. Nothing was skipped.`,
    );
  }
  return { delivered, cursor: next, drained: false, stuck: false };
};

export const drainWatermark = async (
  name: string,
  fetchPage: FetchOrderPage,
  start: OrderPollCursor,
  horizon: string,
  maxPages: number,
): Promise<DrainResult> => {
  const records: OrderRecord[] = [];
  let cursor = start;
  for (let page = 0; page < maxPages; page++) {
    const round = await normalRound(name, fetchPage, cursor, horizon);
    if (round.stuck) {
      if (page > 0) {
        return { records, cursor, drained: false };
      }
      throw new Error(
        `${name}: a full page of ${POLL_PAGE_SIZE} orders all share the modifyDate second ${cursor.watermark}, and ShipStation offers no tie-break or exclusion filter to page past them, so the trigger cannot advance. Nothing was skipped: it keeps its position and will stop here on every poll until fewer orders fill that second (some are modified again) or the page size allows more.`,
      );
    }
    records.push(...round.delivered);
    cursor = round.cursor;
    if (round.drained) {
      return { records, cursor, drained: true };
    }
  }
  return { records, cursor, drained: false };
};

export const pagesPerRound = (batchingEnabled: boolean): number =>
  batchingEnabled ? 1 : MAX_POLL_PAGES;

export const resolveWatermarkWindow = (
  state: PollingState | null | undefined,
  lookBackDate: string | undefined,
  now: string,
): WatermarkWindow => {
  if (state?.lastPolledAt) {
    const since = normalizeWatermark(state.lastPolledAt);
    return state.initialSyncFrom
      ? { since, createdSince: state.initialSyncFrom, isInitialSync: true }
      : { since, createdSince: since, isInitialSync: false };
  }
  if (lookBackDate) {
    return {
      since: toWall(Date.parse(lookBackDate) - WATERMARK_SEED_MARGIN_MS),
      createdSince: lookBackDate,
      isInitialSync: true,
    };
  }
  const since = toWall(Date.parse(now));
  return { since, createdSince: since, isInitialSync: false };
};

export const resolveStartCursor = (
  state: PollingState | null | undefined,
  incoming: OrderPollCursor | undefined,
  window: WatermarkWindow,
): OrderPollCursor =>
  incoming ??
  state?.cursor ?? {
    watermark: window.since,
    boundaryIds: state?.lastPolledAt ? (state.boundaryIds ?? []) : [],
  };

export const nextPollingState = (
  state: PollingState | null | undefined,
  window: WatermarkWindow,
  result: DrainResult,
): PollingState => {
  if (result.drained) {
    return {
      lastPolledAt: result.cursor.watermark,
      boundaryIds: result.cursor.boundaryIds,
    };
  }
  return {
    lastPolledAt: state?.lastPolledAt ?? window.since,
    ...(state?.lastPolledAt && state.boundaryIds
      ? { boundaryIds: state.boundaryIds }
      : {}),
    cursor: result.cursor,
    ...(window.isInitialSync ? { initialSyncFrom: window.createdSince } : {}),
  };
};

export const classifyWatermarkRecords = (
  records: OrderRecord[],
  window: WatermarkWindow,
): PollingChangesObject => {
  const sinceMs = secondOf(window.createdSince) ?? 0;
  const created: OrderRecord[] = [];
  const updated: OrderRecord[] = [];
  for (const record of records) {
    const createdMs = secondOf(record.createDate);
    const modifiedMs = secondOf(record.modifyDate);
    const isNew =
      createdMs !== null &&
      (window.isInitialSync ? createdMs >= sinceMs : createdMs > sinceMs);
    if (isNew) {
      created.push(record);
    } else if (
      !window.isInitialSync ||
      (modifiedMs !== null && modifiedMs >= sinceMs)
    ) {
      updated.push(record);
    }
  }
  return { created, updated };
};

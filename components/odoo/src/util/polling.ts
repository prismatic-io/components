import type { HttpClient } from "@prismatic-io/spectral/dist/clients/http";
import { POLL_PAGE_SIZE, WATERMARK_SKEW_MARGIN_MS } from "../constants";
import type {
  DrainResult,
  DrainRound,
  FetchPollPage,
  OdooRecord,
  PollCursor,
  PollingChangesObject,
  PollingRecordChange,
  PollingState,
  PollPageQuery,
  PollWindow,
} from "../types";
import { json2Path } from "./paths";
const toOdooDate = (iso: string): string =>
  iso
    .replace("T", " ")
    .replace(/\.\d+Z$/, "")
    .replace(/Z$/, "");
const SECOND_MS = 1000;
const NORMAL_ORDER = "write_date asc, id asc";
const TIE_ORDER = "id asc";
const toIso = (epochMs: number): string => new Date(epochMs).toISOString();
const truncateToSecond = (iso: string): string =>
  toIso(Math.floor(new Date(iso).getTime() / SECOND_MS) * SECOND_MS);
export const resolveSafeHorizon = (now: string): string =>
  truncateToSecond(toIso(new Date(now).getTime() - WATERMARK_SKEW_MARGIN_MS));
export const fetchOdooPage =
  (client: HttpClient, model: string): FetchPollPage =>
  async ({ domain, order, limit }: PollPageQuery): Promise<OdooRecord[]> => {
    const { data } = await client.post<OdooRecord[]>(
      json2Path(model, "search_read"),
      { domain, fields: [], limit, order },
    );
    return data;
  };
const parseOdooDate = (value: unknown): Date | null =>
  typeof value === "string"
    ? new Date(
        /Z$|[+-]\d{2}:\d{2}$/.test(value)
          ? value
          : `${value.replace(" ", "T")}Z`,
      )
    : null;
const writeSecond = (record: OdooRecord): number | null => {
  const at = parseOdooDate(record.write_date);
  return at && !Number.isNaN(at.getTime())
    ? Math.floor(at.getTime() / SECOND_MS) * SECOND_MS
    : null;
};
const normalRound = async (
  fetchPage: FetchPollPage,
  cursor: PollCursor,
  horizon: string,
): Promise<DrainRound> => {
  const watermarkMs = Date.parse(cursor.watermark);
  if (watermarkMs > Date.parse(horizon)) {
    return { delivered: [], cursor, drained: true };
  }
  const batch = await fetchPage({
    domain: [
      ["write_date", ">=", toOdooDate(cursor.watermark)],
      ["write_date", "<=", toOdooDate(horizon)],
    ],
    order: NORMAL_ORDER,
    limit: POLL_PAGE_SIZE,
  });
  const boundary = new Set(cursor.boundaryIds);
  const delivered: OdooRecord[] = [];
  let latestMs = watermarkMs;
  let latestIds: number[] = [];
  for (const record of batch) {
    const at = writeSecond(record);
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
  return {
    delivered,
    cursor: stuck ? { ...next, tieGroup: { lastKey: null } } : next,
    drained: false,
  };
};
const tieRound = async (
  fetchPage: FetchPollPage,
  cursor: PollCursor,
  horizon: string,
): Promise<DrainRound> => {
  const watermarkMs = Date.parse(cursor.watermark);
  const lastKey = cursor.tieGroup?.lastKey ?? null;
  const domain: PollPageQuery["domain"] = [
    ["write_date", ">=", toOdooDate(cursor.watermark)],
    ["write_date", "<", toOdooDate(toIso(watermarkMs + SECOND_MS))],
  ];
  if (lastKey !== null) {
    domain.push(["id", ">", lastKey]);
  }
  const batch = await fetchPage({
    domain,
    order: TIE_ORDER,
    limit: POLL_PAGE_SIZE,
  });
  const boundary = new Set(cursor.boundaryIds);
  const delivered: OdooRecord[] = [];
  for (const record of batch) {
    if (writeSecond(record) !== watermarkMs || boundary.has(record.id)) {
      continue;
    }
    delivered.push(record);
    boundary.add(record.id);
  }
  if (batch.length >= POLL_PAGE_SIZE) {
    return {
      delivered,
      cursor: {
        watermark: cursor.watermark,
        boundaryIds: [...boundary],
        tieGroup: { lastKey: batch[batch.length - 1].id },
      },
      drained: false,
    };
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
export const drainWatermark = async (
  fetchPage: FetchPollPage,
  start: PollCursor,
  horizon: string,
  maxPages: number,
): Promise<DrainResult> => {
  const records: OdooRecord[] = [];
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
export const resolveStartCursor = (
  state: PollingState | undefined,
  incoming: PollCursor | undefined,
  window: PollWindow,
): PollCursor =>
  incoming ??
  state?.cursor ?? {
    watermark: truncateToSecond(window.since),
    boundaryIds: state?.lastPolledAt ? (state.boundaryIds ?? []) : [],
  };
export const nextPollingState = (
  state: PollingState | undefined,
  window: PollWindow,
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
export const resolvePollWindow = (
  state: PollingState | undefined,
  lookBackDate: string | undefined,
  now: string,
): PollWindow => {
  if (state?.lastPolledAt) {
    return state.initialSyncFrom
      ? {
          since: state.lastPolledAt,
          isInitialSync: true,
          createdSince: state.initialSyncFrom,
        }
      : {
          since: state.lastPolledAt,
          isInitialSync: false,
          createdSince: state.lastPolledAt,
        };
  }
  if (lookBackDate) {
    return {
      since: lookBackDate,
      isInitialSync: true,
      createdSince: lookBackDate,
    };
  }
  return { since: now, isInitialSync: false, createdSince: now };
};
export const splitPolledRecords = (
  records: OdooRecord[],
  window: PollWindow,
  filters: {
    showNew: boolean;
    showUpdated: boolean;
  },
): PollingChangesObject => {
  const sinceDate = new Date(window.createdSince);
  const created: OdooRecord[] = [];
  const updated: OdooRecord[] = [];
  for (const record of records) {
    const createdAt = parseOdooDate(record.create_date);
    const isNew =
      createdAt !== null &&
      (window.isInitialSync ? createdAt >= sinceDate : createdAt > sinceDate);
    if (isNew && (window.isInitialSync || filters.showNew)) {
      created.push(record);
    } else if (!isNew && (window.isInitialSync || filters.showUpdated)) {
      updated.push(record);
    }
  }
  return { created, updated };
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

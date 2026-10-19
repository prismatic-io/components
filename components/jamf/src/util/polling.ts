import type { HttpClient } from "@prismatic-io/spectral/dist/clients/http";
import { MAX_PAGE_SIZE, WATERMARK_SKEW_MARGIN_MS } from "../constants";
import type {
  ComputerDrainRound,
  ComputerInventory,
  ComputerPollCursor,
  ComputerPollingState,
  FetchComputerPage,
  NewComputerChange,
  NewComputersChanges,
  PagedResponse,
} from "../types";
export const resolveNewComputerChanges = (
  data: NewComputersChanges | undefined,
): NewComputerChange[] =>
  (data ?? []).map(
    (record): NewComputerChange => ({ changeType: "created", record }),
  );
const SECOND_MS = 1000;
const INVENTORY_ENDPOINT = "/v3/computers-inventory";
const TRIGGER_NAME = "pollNewComputers";
const NORMAL_SORT = "general.lastEnrolledDate:asc,id:asc";
const TIE_SORT = "id:asc";
const toIso = (epochMs: number): string => new Date(epochMs).toISOString();
const truncateToSecond = (iso: string): string =>
  toIso(Math.floor(Date.parse(iso) / SECOND_MS) * SECOND_MS);
const toFilterDate = (iso: string): string => iso.replace(/\.\d+Z$/, "Z");
export const resolveSafeHorizon = (now: string): string =>
  truncateToSecond(toIso(Date.parse(now) - WATERMARK_SKEW_MARGIN_MS));
export const fetchComputerPage =
  (client: HttpClient): FetchComputerPage =>
  async ({ filter, sort, pageSize }): Promise<ComputerInventory[]> => {
    const { data } = await client.get<PagedResponse<ComputerInventory>>(
      INVENTORY_ENDPOINT,
      {
        params: {
          section: ["GENERAL"],
          filter,
          sort,
          page: 0,
          "page-size": pageSize,
        },
        paramsSerializer: { indexes: null },
      },
    );
    return data.results;
  };
const enrolledSecond = (record: ComputerInventory): number | null => {
  const raw = record.general?.lastEnrolledDate;
  const at = typeof raw === "string" ? Date.parse(raw) : Number.NaN;
  return Number.isNaN(at) ? null : Math.floor(at / SECOND_MS) * SECOND_MS;
};
const noProgress = (watermark: string): Error =>
  new Error(
    `${TRIGGER_NAME}: the watermark cursor cannot advance past ${watermark}: a full page (page size ${MAX_PAGE_SIZE}) held no computer enrolled at or after it, so the same request would return the same page on every poll. Stopping instead of looping.`,
  );
const normalRound = async (
  fetchPage: FetchComputerPage,
  cursor: ComputerPollCursor,
  horizon: string,
): Promise<ComputerDrainRound> => {
  const watermarkMs = Date.parse(cursor.watermark);
  if (watermarkMs > Date.parse(horizon)) {
    return { delivered: [], cursor, drained: true };
  }
  const batch = await fetchPage({
    filter: `general.lastEnrolledDate=ge="${toFilterDate(cursor.watermark)}";general.lastEnrolledDate=le="${toFilterDate(horizon)}"`,
    sort: NORMAL_SORT,
    pageSize: MAX_PAGE_SIZE,
  });
  const boundary = new Set(cursor.boundaryIds);
  const delivered: ComputerInventory[] = [];
  let latestMs = watermarkMs;
  let latestIds: string[] = [];
  for (const record of batch) {
    const at = enrolledSecond(record);
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
  const full = batch.length >= MAX_PAGE_SIZE;
  const stuck = latestMs === watermarkMs;
  if (full && stuck && latestIds.length === 0) {
    throw noProgress(cursor.watermark);
  }
  const next: ComputerPollCursor = stuck
    ? {
        watermark: cursor.watermark,
        boundaryIds: [...new Set([...cursor.boundaryIds, ...latestIds])],
      }
    : { watermark: toIso(latestMs), boundaryIds: latestIds };
  if (!full) {
    return { delivered, cursor: next, drained: true };
  }
  return {
    delivered,
    cursor: stuck ? { ...next, tieGroup: { lastKey: null } } : next,
    drained: false,
  };
};
const tieRound = async (
  fetchPage: FetchComputerPage,
  cursor: ComputerPollCursor,
  horizon: string,
): Promise<ComputerDrainRound> => {
  const watermarkMs = Date.parse(cursor.watermark);
  const lastKey = cursor.tieGroup?.lastKey ?? null;
  const batch = await fetchPage({
    filter: `general.lastEnrolledDate=ge="${toFilterDate(cursor.watermark)}";general.lastEnrolledDate=lt="${toFilterDate(toIso(watermarkMs + SECOND_MS))}"${lastKey === null ? "" : `;id=gt=${lastKey}`}`,
    sort: TIE_SORT,
    pageSize: MAX_PAGE_SIZE,
  });
  const boundary = new Set(cursor.boundaryIds);
  const delivered: ComputerInventory[] = [];
  for (const record of batch) {
    if (enrolledSecond(record) !== watermarkMs || boundary.has(record.id)) {
      continue;
    }
    delivered.push(record);
    boundary.add(record.id);
  }
  if (batch.length >= MAX_PAGE_SIZE) {
    const nextKey = batch[batch.length - 1].id;
    if (nextKey === lastKey) {
      throw noProgress(cursor.watermark);
    }
    return {
      delivered,
      cursor: {
        watermark: cursor.watermark,
        boundaryIds: [...boundary],
        tieGroup: { lastKey: nextKey },
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
  fetchPage: FetchComputerPage,
  start: ComputerPollCursor,
  horizon: string,
  maxPages: number,
): Promise<ComputerDrainRound> => {
  const delivered: ComputerInventory[] = [];
  let cursor = start;
  for (let page = 0; page < maxPages; page++) {
    const round = cursor.tieGroup
      ? await tieRound(fetchPage, cursor, horizon)
      : await normalRound(fetchPage, cursor, horizon);
    delivered.push(...round.delivered);
    cursor = round.cursor;
    if (round.drained) {
      return { delivered, cursor, drained: true };
    }
  }
  return { delivered, cursor, drained: false };
};
export const resolveStartCursor = (
  state: ComputerPollingState,
  incoming: ComputerPollCursor | undefined,
  seed: string,
): ComputerPollCursor =>
  incoming ??
  state.cursor ?? {
    watermark: truncateToSecond(state.lastPolledAt ?? seed),
    boundaryIds: state.lastPolledAt ? (state.boundaryIds ?? []) : [],
  };
export const nextPollingState = (
  state: ComputerPollingState,
  seed: string,
  result: ComputerDrainRound,
): ComputerPollingState => {
  if (result.drained) {
    return {
      lastPolledAt: result.cursor.watermark,
      boundaryIds: result.cursor.boundaryIds,
    };
  }
  return {
    lastPolledAt: state.lastPolledAt ?? seed,
    ...(state.lastPolledAt && state.boundaryIds
      ? { boundaryIds: state.boundaryIds }
      : {}),
    cursor: result.cursor,
  };
};

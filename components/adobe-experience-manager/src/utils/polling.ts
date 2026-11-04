import type { HttpClient } from "@prismatic-io/spectral/http";
import {
  ASSET_MODIFY_DATE_FIELD,
  ASSETS_API_PATH,
  MAX_PAGE_LIMIT,
  SETTLE_LAG_MS,
  SITES_API_PATH,
  UNBATCHED_MAX_PAGES,
} from "../constants";
import type {
  AemChangeItem,
  AemChangeType,
  AemContentRecord,
  AemPollingChangesObject,
  AssetSearchFilters,
  AssetSearchHit,
  AssetSearchRequest,
  AssetSearchResponse,
  ContentFragment,
  ContentFragmentSearchFilter,
  CursorPageResponse,
  PollingState,
  PollWindow,
  PollWindowCursor,
  WindowPage,
} from "../types";
import { buildAssetFilterClauses } from "./assetFilters";
import { toIsoDate } from "./dates";

export const windowNow = (nowMs: number = Date.now()): string =>
  new Date(nowMs - SETTLE_LAG_MS).toISOString();

export const resolvePollWindow = (
  state: PollingState,
  incoming: PollWindowCursor | undefined,
  lookBackDate: string,
  now: string,
): PollWindow => {
  const resume = incoming ?? state.cursor;
  const isInitialSync = state.lastPolledAt === undefined && lookBackDate !== "";
  if (resume) {
    return {
      windowStart: resume.windowStart,
      windowEnd: resume.windowEnd,
      cursor: resume.cursor,
      isInitialSync,
    };
  }
  return {
    windowStart: state.lastPolledAt ?? (lookBackDate || now),
    windowEnd: now,
    isInitialSync,
  };
};

export const nextPollingState = (
  state: PollingState,
  window: PollWindow,
  nextCursor: PollWindowCursor | undefined,
): PollingState =>
  nextCursor
    ? {
        ...(state.lastPolledAt ? { lastPolledAt: state.lastPolledAt } : {}),
        cursor: nextCursor,
      }
    : { lastPolledAt: window.windowEnd };

const readWindow = async <T>(
  readPage: (cursor: string | undefined) => Promise<WindowPage<T>>,
  startCursor: string | undefined,
  isBatching: boolean,
): Promise<WindowPage<T>> => {
  const maxPages = isBatching ? 1 : UNBATCHED_MAX_PAGES;
  const records: T[] = [];
  let cursor = startCursor;
  for (let page = 0; page < maxPages; page++) {
    const result = await readPage(cursor);
    records.push(...result.records);
    cursor = result.cursor;
    if (!cursor) break;
  }
  return { records, cursor };
};

const isInWindow = (value: string | undefined, window: PollWindow): boolean => {
  if (!value) return false;
  const time = toIsoDate(value).getTime();
  return (
    time >= toIsoDate(window.windowStart).getTime() &&
    time < toIsoDate(window.windowEnd).getTime()
  );
};

export const listChangedContentFragments = async (
  client: HttpClient,
  baseFilter: ContentFragmentSearchFilter,
  window: PollWindow,
  isBatching: boolean,
): Promise<WindowPage<ContentFragment>> => {
  const after = new Date(
    toIsoDate(window.windowStart).getTime() - 1,
  ).toISOString();
  const before = new Date(
    toIsoDate(window.windowEnd).getTime() + 1,
  ).toISOString();
  const query = JSON.stringify({
    filter: { ...baseFilter, modifiedOrCreated: { after, before } },
    sort: [{ on: "modifiedOrCreated", order: "ASC" }],
  });
  const result = await readWindow<ContentFragment>(
    async (cursor) => {
      const { data } = await client.get<CursorPageResponse<ContentFragment>>(
        `${SITES_API_PATH}/cf/fragments/search`,
        { params: { query, cursor, limit: MAX_PAGE_LIMIT } },
      );
      return { records: data.items ?? [], cursor: data.cursor };
    },
    window.cursor,
    isBatching,
  );
  return {
    records: result.records.filter((fragment) =>
      isInWindow(fragment.modified?.at ?? fragment.created?.at, window),
    ),
    cursor: result.cursor,
  };
};

export const listChangedAssets = async (
  client: HttpClient,
  filters: AssetSearchFilters,
  window: PollWindow,
  isBatching: boolean,
): Promise<WindowPage<AssetSearchHit>> =>
  readWindow<AssetSearchHit>(
    async (cursor) => {
      const body: AssetSearchRequest = {
        query: [
          ...buildAssetFilterClauses(filters),
          {
            range: {
              [ASSET_MODIFY_DATE_FIELD]: {
                gte: window.windowStart,
                lt: window.windowEnd,
              },
            },
          },
        ],
        sort: [{ field: ASSET_MODIFY_DATE_FIELD, order: "ASC" }],
        limit: MAX_PAGE_LIMIT,
        cursor,
      };
      const { data } = await client.post<AssetSearchResponse>(
        `${ASSETS_API_PATH}/search`,
        body,
      );
      return { records: data.hits?.results ?? [], cursor: data.cursor };
    },
    window.cursor,
    isBatching,
  );

export const classifyChange = (
  record: AemContentRecord,
  windowStart: string,
  isInitialSync: boolean,
): AemChangeType => {
  if (isInitialSync) return "initialSync";
  const start = toIsoDate(windowStart).getTime();
  const isAfterStart = (value: string | null) =>
    value !== null && toIsoDate(value).getTime() >= start;
  if (isAfterStart(record.created)) return "created";
  if (isAfterStart(record.published)) return "published";
  return "modified";
};

export const resolveAemChangeItems = (
  data: AemPollingChangesObject | undefined,
): AemChangeItem[] => {
  const changesObject = data ?? {};
  return [...(changesObject.items ?? [])];
};

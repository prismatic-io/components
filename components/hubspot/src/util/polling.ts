import type { HttpClient } from "@prismatic-io/spectral/dist/clients/http";
import { HUBSPOT_DATE_PROPERTIES } from "../constant";
import {
  CUSTOM_OBJECT_CREATED_PROPERTY,
  CUSTOM_OBJECT_LAST_MODIFIED_PROPERTY,
  CUSTOM_OBJECT_SEARCH_ENDPOINT,
  MAX_FILTER_GROUPS,
  MAX_FILTERS_PER_GROUP,
  MAX_FILTERS_TOTAL,
  MAX_SEARCH_LIMIT,
} from "../constants";
import type {
  PollingChangesObject,
  PollingTriggerObject,
} from "../types/PollingTriggerObject";
import type {
  CursorLogger,
  FetchPollingWindowParams,
  HttpErrorish,
  PollingCursor,
  PollingWindow,
  ResolveCursorParams,
  SearchFilter,
  SearchFilterGroup,
} from "../types/polling";
import type { SearchResponse } from "../types/SearchResponse";
const assertValidDateString = (value: unknown, field: string): string => {
  if (typeof value !== "string" || Number.isNaN(new Date(value).getTime())) {
    throw new Error(
      `Invalid polling ${field}: ${JSON.stringify(value)}. Expected an ISO date string.`,
    );
  }
  return value;
};
export const resolveCursor = ({
  incoming,
  state,
  lookBackDate,
  now,
}: ResolveCursorParams): PollingCursor => {
  const resumed = incoming ?? state.cursor;
  if (resumed) {
    const watermark = assertValidDateString(
      resumed.watermark,
      "cursor.watermark",
    );
    const windowStart = assertValidDateString(
      resumed.windowStart,
      "cursor.windowStart",
    );
    const windowEnd = assertValidDateString(
      resumed.windowEnd,
      "cursor.windowEnd",
    );
    if (typeof resumed.isBackfill !== "boolean") {
      throw new Error(
        `Invalid polling cursor.isBackfill: ${JSON.stringify(resumed.isBackfill)}. Expected a boolean.`,
      );
    }
    let idWalk: PollingCursor["idWalk"];
    if (resumed.idWalk !== undefined) {
      const walk = resumed.idWalk as {
        denseTimestamp?: unknown;
        idWatermark?: unknown;
      };
      const denseTimestamp = assertValidDateString(
        walk.denseTimestamp,
        "cursor.idWalk.denseTimestamp",
      );
      if (typeof walk.idWatermark !== "string") {
        throw new Error(
          `Invalid polling cursor.idWalk.idWatermark: ${JSON.stringify(walk.idWatermark)}. Expected a string.`,
        );
      }
      idWalk = { denseTimestamp, idWatermark: walk.idWatermark };
    }
    return {
      watermark,
      windowStart,
      windowEnd,
      isBackfill: resumed.isBackfill,
      ...(idWalk ? { idWalk } : {}),
    };
  }
  if (state.lastPolledAt) {
    const watermark = assertValidDateString(
      state.lastPolledAt,
      "state.lastPolledAt",
    );
    return {
      watermark,
      windowStart: watermark,
      windowEnd: now,
      isBackfill: false,
    };
  }
  if (lookBackDate) {
    return {
      watermark: lookBackDate,
      windowStart: lookBackDate,
      windowEnd: now,
      isBackfill: true,
    };
  }
  return {
    watermark: now,
    windowStart: now,
    windowEnd: now,
    isBackfill: false,
  };
};
export const resolveCursorSafely = (
  params: ResolveCursorParams & {
    logger: CursorLogger;
  },
): PollingCursor => {
  const { incoming, state, lookBackDate, now, logger } = params;
  try {
    return resolveCursor({ incoming, state, lookBackDate, now });
  } catch (error) {
    if (incoming || !state.cursor) {
      throw error;
    }
    const message = error instanceof Error ? error.message : String(error);
    logger.warn(
      `Discarding corrupted persisted polling cursor and restarting from lastPolledAt (or a fresh sync if that is also absent): ${message}`,
    );
    try {
      return resolveCursor({
        incoming,
        state: { ...state, cursor: undefined },
        lookBackDate,
        now,
      });
    } catch (retryError) {
      const retryMessage =
        retryError instanceof Error ? retryError.message : String(retryError);
      logger.warn(
        `Persisted state.lastPolledAt is also corrupted; discarding it too and starting a fresh sync: ${retryMessage}`,
      );
      return resolveCursor({
        incoming,
        state: { ...state, cursor: undefined, lastPolledAt: undefined },
        lookBackDate,
        now,
      });
    }
  }
};
export const OBJECT_ID_PROPERTY = "hs_object_id";
const nextMillisecond = (iso: string): string =>
  new Date(new Date(iso).getTime() + 1).toISOString();
const resumeAfterDenseMs = (cursor: PollingCursor): PollingCursor => ({
  watermark: nextMillisecond(
    (cursor.idWalk as NonNullable<PollingCursor["idWalk"]>).denseTimestamp,
  ),
  windowStart: cursor.windowStart,
  windowEnd: cursor.windowEnd,
  isBackfill: cursor.isBackfill,
});
export const advanceCursor = (
  { records, hasMore }: PollingWindow,
  cursor: PollingCursor,
): {
  emit: PollingTriggerObject[];
  nextCursor: PollingCursor | null;
} => {
  if (cursor.idWalk) {
    if (records.length === 0) {
      return { emit: [], nextCursor: resumeAfterDenseMs(cursor) };
    }
    const lastId = records[records.length - 1].id;
    if (hasMore) {
      return {
        emit: records,
        nextCursor: {
          ...cursor,
          idWalk: {
            denseTimestamp: cursor.idWalk.denseTimestamp,
            idWatermark: lastId,
          },
        },
      };
    }
    return { emit: records, nextCursor: resumeAfterDenseMs(cursor) };
  }
  if (!hasMore || records.length === 0) {
    return { emit: records, nextCursor: null };
  }
  const boundaryField = cursor.isBackfill ? "createdAt" : "updatedAt";
  const boundary = records[records.length - 1][boundaryField] as string;
  const emit = records.filter((r) => r[boundaryField] !== boundary);
  assertValidDateString(boundary, `record.${boundaryField}`);
  if (emit.length === 0) {
    return {
      emit: [],
      nextCursor: {
        ...cursor,
        idWalk: { denseTimestamp: boundary, idWatermark: "" },
      },
    };
  }
  if (new Date(boundary).getTime() <= new Date(cursor.watermark).getTime()) {
    throw new Error(
      `Cannot advance the polling cursor: the window ended at ${boundary}, at or before the current position ${cursor.watermark}. Records must arrive sorted ascending by the queried date property.`,
    );
  }
  return {
    emit,
    nextCursor: {
      watermark: boundary,
      windowStart: cursor.windowStart,
      windowEnd: cursor.windowEnd,
      isBackfill: cursor.isBackfill,
    },
  };
};
export const resolveEndpoint = (
  searchEndpoint: string | undefined,
  objectType: string | undefined,
  onlyCustomObjects: boolean,
): string => {
  const endpoint = onlyCustomObjects
    ? CUSTOM_OBJECT_SEARCH_ENDPOINT
    : searchEndpoint;
  if (!endpoint) {
    throw new Error("Search Endpoint input is required");
  }
  if (endpoint === CUSTOM_OBJECT_SEARCH_ENDPOINT) {
    if (!objectType) {
      throw new Error("Object Type input is required");
    }
    return endpoint.replace("{objectType}", objectType);
  }
  return endpoint;
};
export const resolveLastModifiedProperty = (
  searchEndpoint: string | undefined,
  onlyCustomObjects: boolean,
): string => {
  if (onlyCustomObjects) {
    return CUSTOM_OBJECT_LAST_MODIFIED_PROPERTY;
  }
  const table = HUBSPOT_DATE_PROPERTIES as Record<
    string,
    Record<string, string> | undefined
  >;
  const properties = searchEndpoint
    ? table[searchEndpoint.toLowerCase()]
    : undefined;
  const lastModified = properties
    ? Object.values(properties).find((name) => name.includes("lastmodified"))
    : undefined;
  if (!lastModified) {
    throw new Error(
      `No last-modified property is known for the search endpoint ${searchEndpoint ?? "(none provided)"}. The polling trigger cannot filter by date without one.`,
    );
  }
  return lastModified;
};
export const resolveCreatedProperty = (
  searchEndpoint: string | undefined,
  onlyCustomObjects: boolean,
): string => {
  if (onlyCustomObjects) {
    return CUSTOM_OBJECT_CREATED_PROPERTY;
  }
  const table = HUBSPOT_DATE_PROPERTIES as Record<
    string,
    Record<string, string> | undefined
  >;
  const properties = searchEndpoint
    ? table[searchEndpoint.toLowerCase()]
    : undefined;
  const created = properties
    ? Object.values(properties).find((name) => name.includes("create"))
    : undefined;
  if (!created) {
    throw new Error(
      `No creation-date property is known for the search endpoint ${searchEndpoint ?? "(none provided)"}. The polling trigger cannot run an initial sync without one.`,
    );
  }
  return created;
};
export const buildPollingFilterGroups = (
  searchProperties: Record<string, unknown> | undefined,
  dateProp: string,
  cursor: PollingCursor,
): SearchFilterGroup[] => {
  const cursorFilters: SearchFilter[] = cursor.idWalk
    ? [
        {
          propertyName: dateProp,
          operator: "GTE",
          value: cursor.idWalk.denseTimestamp,
        },
        {
          propertyName: dateProp,
          operator: "LT",
          value: nextMillisecond(cursor.idWalk.denseTimestamp),
        },
        ...(cursor.idWalk.idWatermark
          ? [
              {
                propertyName: OBJECT_ID_PROPERTY,
                operator: "GT",
                value: cursor.idWalk.idWatermark,
              },
            ]
          : []),
      ]
    : [
        { propertyName: dateProp, operator: "GTE", value: cursor.watermark },
        { propertyName: dateProp, operator: "LT", value: cursor.windowEnd },
      ];
  const declaredGroups = searchProperties?.filterGroups as
    | SearchFilterGroup[]
    | undefined;
  const declaredFilters = searchProperties?.filters as
    | SearchFilter[]
    | undefined;
  const userGroups: SearchFilterGroup[] = declaredGroups?.length
    ? declaredGroups
    : declaredFilters?.length
      ? [{ filters: declaredFilters }]
      : [{ filters: [] }];
  const groups = userGroups.map((group) => ({
    filters: [...(group.filters ?? []), ...cursorFilters],
  }));
  if (groups.length > MAX_FILTER_GROUPS) {
    throw new Error(
      `Search Properties defines ${groups.length} filter groups, but HubSpot allows at most ${MAX_FILTER_GROUPS}.`,
    );
  }
  const overGroupIndex = groups.findIndex(
    (g) => g.filters.length > MAX_FILTERS_PER_GROUP,
  );
  if (overGroupIndex !== -1) {
    const count = groups[overGroupIndex].filters.length;
    throw new Error(
      `Filter group ${overGroupIndex + 1} would carry ${count} filters once the polling cursor adds its ${cursorFilters.length} date bounds, but HubSpot allows at most ${MAX_FILTERS_PER_GROUP} per group. Remove ${count - MAX_FILTERS_PER_GROUP} filter(s) from that group.`,
    );
  }
  const total = groups.reduce((sum, g) => sum + g.filters.length, 0);
  if (total > MAX_FILTERS_TOTAL) {
    throw new Error(
      `Search Properties would produce ${total} filters once the polling cursor adds ${cursorFilters.length} date bounds to each of its ${groups.length} filter groups, but HubSpot allows at most ${MAX_FILTERS_TOTAL} in total. Reduce the number of filters or filter groups.`,
    );
  }
  return groups;
};
export const buildPollingSearchBody = (
  searchProperties: Record<string, unknown> | undefined,
  dateProp: string,
  cursor: PollingCursor,
  limit: number,
  after?: string,
): Record<string, unknown> => {
  const {
    filters: _filters,
    filterGroups: _filterGroups,
    sorts: _sorts,
    ...rest
  } = searchProperties ?? {};
  return {
    ...rest,
    limit,
    ...(after ? { after } : {}),
    filterGroups: buildPollingFilterGroups(searchProperties, dateProp, cursor),
    sorts: [
      {
        propertyName: cursor.idWalk ? OBJECT_ID_PROPERTY : dateProp,
        direction: "ASCENDING",
      },
    ],
  };
};
export const windowFloor = (cursor: PollingCursor): Date =>
  new Date(new Date(cursor.watermark).getTime() - 1);
export const cycleFloor = (cursor: PollingCursor): Date =>
  new Date(new Date(cursor.windowStart).getTime() - 1);
export const getPollingChanges = (
  showNewRecords: boolean,
  showUpdatedRecords: boolean,
  searchRecords: PollingTriggerObject[],
  windowFloorDate: Date,
  cycleFloorDate: Date,
  options: {
    snapshot?: boolean;
  } = {},
): {
  changes: number;
  changesObject: PollingChangesObject;
} => {
  const changesObject: PollingChangesObject = {
    createdRecords: [],
    updatedRecords: [],
  };
  if (options.snapshot) {
    changesObject.createdRecords = [...searchRecords];
    return { changes: searchRecords.length, changesObject };
  }
  let changes = 0;
  for (const record of searchRecords) {
    const recordUpdatedAt = new Date(record.updatedAt);
    const recordCreatedAt = new Date(record.createdAt);
    const changeExists =
      recordUpdatedAt > windowFloorDate || recordCreatedAt > cycleFloorDate;
    if (!changeExists) {
      continue;
    }
    const isCreated = recordCreatedAt > cycleFloorDate;
    const isUpdated = recordUpdatedAt > recordCreatedAt;
    if (isCreated && showNewRecords) {
      changes += 1;
      changesObject.createdRecords.push(record);
    }
    if (isUpdated && showUpdatedRecords) {
      changes += 1;
      changesObject.updatedRecords.push(record);
    }
  }
  return { changes, changesObject };
};
export const RATE_LIMIT_MAX_ATTEMPTS = 5;
const RATE_LIMIT_FALLBACK_DELAY_MS = 1000;
const sleep = (ms: number): Promise<void> =>
  new Promise((resolve) => setTimeout(resolve, ms));
const statusOf = (error: unknown): number | undefined =>
  (error as HttpErrorish)?.response?.status;
const messageOf = (error: unknown): string =>
  (error as HttpErrorish)?.response?.data?.message ?? "";
const retryAfterMs = (error: unknown, attempt: number): number => {
  const raw = (error as HttpErrorish)?.response?.headers?.["retry-after"];
  const seconds = Number(raw);
  return Number.isFinite(seconds) && seconds >= 0
    ? seconds * 1000
    : RATE_LIMIT_FALLBACK_DELAY_MS * attempt;
};
const postSearchPage = async (
  client: HttpClient,
  endpoint: string,
  body: Record<string, unknown>,
  dateProp: string,
  logger: CursorLogger,
): Promise<{
  data: SearchResponse;
}> => {
  for (let attempt = 1; ; attempt += 1) {
    try {
      return await client.post<SearchResponse>(endpoint, body);
    } catch (error) {
      if (statusOf(error) === 400 && messageOf(error).includes(dateProp)) {
        throw new Error(
          `HubSpot rejected the polling query because the property "${dateProp}" is not searchable on ${endpoint}. HubSpot reported: ${messageOf(error)}`,
        );
      }
      if (statusOf(error) !== 429 || attempt >= RATE_LIMIT_MAX_ATTEMPTS) {
        throw error;
      }
      const delayMs = retryAfterMs(error, attempt);
      logger.warn(
        `HubSpot rate limited the polling query (attempt ${attempt} of ${RATE_LIMIT_MAX_ATTEMPTS}); retrying in ${delayMs}ms.`,
      );
      await sleep(delayMs);
    }
  }
};
export const fetchPollingWindow = async (
  client: HttpClient,
  {
    endpoint,
    searchProperties,
    dateProp,
    cursor,
    windowLimit,
  }: FetchPollingWindowParams,
  logger: CursorLogger,
): Promise<PollingWindow> => {
  const records: PollingTriggerObject[] = [];
  let after: string | undefined;
  let hasMore = false;
  while (records.length < windowLimit) {
    const limit = Math.min(MAX_SEARCH_LIMIT, windowLimit - records.length);
    const body = buildPollingSearchBody(
      searchProperties,
      dateProp,
      cursor,
      limit,
      after,
    );
    const { data } = await postSearchPage(
      client,
      endpoint,
      body,
      dateProp,
      logger,
    );
    const before = records.length;
    records.push(...((data.results ?? []) as PollingTriggerObject[]));
    after = data.paging?.next?.after;
    if (records.length === before) {
      hasMore = false;
      break;
    }
    hasMore = Boolean(after) || records.length < data.total;
    if (!after) {
      break;
    }
  }
  return { records, hasMore };
};

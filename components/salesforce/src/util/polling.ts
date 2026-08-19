import type { Connection } from "jsforce";
import type {
  AdvanceResult,
  DeletedRecord,
  FetchPollingPageParams,
  PollingCursor,
  PollingLogger,
  PollingTriggerObject,
  ResolveCursorParams,
  SalesforceChangesObject,
  SalesforceRecordChange,
} from "../types";
import { buildSOQLQuery, formatSOQLDateTime, formatSOQLId } from "./query";
const recordId = (record: PollingTriggerObject): string => {
  const id = record.Id;
  if (typeof id !== "string" || id === "") {
    throw new Error(
      `Polling record is missing a usable Id: ${JSON.stringify(record.Id)}`,
    );
  }
  return id;
};
const keyOf = (record: PollingTriggerObject): [string, string] => [
  formatSOQLDateTime(record.LastModifiedDate),
  recordId(record),
];
export const advanceCursor = (
  records: PollingTriggerObject[],
  cursor: PollingCursor,
  pageSize: number,
): AdvanceResult => {
  for (let i = 1; i < records.length; i++) {
    const [prevAt, prevId] = keyOf(records[i - 1]);
    const [nextAt, nextId] = keyOf(records[i]);
    if (!(nextAt > prevAt || (nextAt === prevAt && nextId > prevId))) {
      throw new Error(
        `Cannot advance the polling cursor: record ${nextId} at ${nextAt} does not follow ${prevId} at ${prevAt}. Records must arrive sorted ascending by LastModifiedDate, Id.`,
      );
    }
  }
  if (records.length === 0 || records.length < pageSize) {
    return { emit: records, nextCursor: null };
  }
  const [watermark, lastId] = keyOf(records[records.length - 1]);
  const previous = formatSOQLDateTime(cursor.watermark);
  const advanced =
    watermark > previous ||
    (watermark === previous &&
      (cursor.lastId === undefined || lastId > cursor.lastId));
  if (!advanced) {
    throw new Error(
      `Cannot advance the polling cursor: the page ended at (${watermark}, ${lastId}), at or before the current position (${cursor.watermark}, ${cursor.lastId ?? "none"}). Records must arrive sorted ascending by LastModifiedDate, Id.`,
    );
  }
  return {
    emit: records,
    nextCursor: {
      watermark,
      lastId,
      windowStart: cursor.windowStart,
      windowEnd: cursor.windowEnd,
      isBackfill: cursor.isBackfill,
    },
  };
};
export const buildPollingConditions = (cursor: PollingCursor): string[] => {
  const watermark = formatSOQLDateTime(cursor.watermark);
  return [
    `LastModifiedDate >= ${watermark}`,
    `LastModifiedDate < ${formatSOQLDateTime(cursor.windowEnd)}`,
    ...(cursor.lastId
      ? [
          `(LastModifiedDate > ${watermark} OR (LastModifiedDate = ${watermark} AND Id > ${formatSOQLId(cursor.lastId)}))`,
        ]
      : []),
    ...(cursor.isBackfill
      ? [`CreatedDate >= ${formatSOQLDateTime(cursor.windowStart)}`]
      : []),
  ];
};
export const classifyFromCursor = (cursor: PollingCursor): Date =>
  new Date(new Date(formatSOQLDateTime(cursor.watermark)).getTime() - 1);
export const createdSinceCursor = (cursor: PollingCursor): Date =>
  new Date(new Date(formatSOQLDateTime(cursor.windowStart)).getTime() - 1);
export const fetchPollingPage = async (
  client: Connection,
  { recordType, fields, filters, cursor, pageSize }: FetchPollingPageParams,
): Promise<PollingTriggerObject[]> => {
  if (!Number.isInteger(pageSize) || pageSize < 1) {
    throw new Error(
      `Invalid polling page size ${pageSize}: must be a positive integer.`,
    );
  }
  const soql = buildSOQLQuery({
    recordType,
    fields,
    filters,
    sortValue: "LastModifiedDate Id",
    maxRecords: pageSize,
    conditions: buildPollingConditions(cursor),
  });
  const result = await client.query(soql, {
    autoFetch: true,
    maxFetch: pageSize,
  });
  if (result.done !== true && result.records.length < pageSize) {
    throw new Error(
      `Salesforce returned ${result.records.length} of ${pageSize} requested records without confirming the result set was complete. Refusing to treat this as the final page.`,
    );
  }
  return result.records as PollingTriggerObject[];
};
export const fetchPollingWindow = async (
  client: Connection,
  params: FetchPollingPageParams,
): Promise<AdvanceResult> =>
  advanceCursor(
    await fetchPollingPage(client, params),
    params.cursor,
    params.pageSize,
  );
export const getPollingChanges = (
  showNewRecords: boolean,
  showUpdatedRecords: boolean,
  searchRecords: PollingTriggerObject[],
  lastPolledAtDate: Date,
  createdSinceDate: Date,
  deletedRecords: DeletedRecord[] = [],
  options: {
    snapshot?: boolean;
  } = {},
) => {
  let changes = 0;
  const changesObject = searchRecords.reduce(
    (acc, record) => {
      const recordUpdatedAt = new Date(record.LastModifiedDate);
      const recordCreatedAt = new Date(record.CreatedDate);
      const changeExists =
        recordUpdatedAt > lastPolledAtDate ||
        recordCreatedAt > createdSinceDate;
      if (changeExists) {
        const isCreated = recordCreatedAt > createdSinceDate;
        const isUpdated = options.snapshot
          ? !isCreated
          : recordUpdatedAt > recordCreatedAt;
        const reportNew = options.snapshot || showNewRecords;
        const reportUpdated = options.snapshot || showUpdatedRecords;
        if (isCreated && reportNew) {
          changes += 1;
          acc.createdRecords.push(record);
        }
        if (isUpdated && reportUpdated) {
          changes += 1;
          acc.updatedRecords.push(record);
        }
      }
      return acc;
    },
    {
      updatedRecords: [] as PollingTriggerObject[],
      createdRecords: [] as PollingTriggerObject[],
      deletedRecords,
    },
  );
  changes += deletedRecords.length;
  return {
    changesObject,
    changes,
  };
};
export const resolvePollingRecordChanges = (
  data: SalesforceChangesObject | undefined,
): SalesforceRecordChange[] => {
  const changesObject = data ?? {
    createdRecords: [],
    updatedRecords: [],
    deletedRecords: [],
  };
  return [
    ...(changesObject.createdRecords ?? []).map(
      (record): SalesforceRecordChange => ({ changeType: "created", record }),
    ),
    ...(changesObject.updatedRecords ?? []).map(
      (record): SalesforceRecordChange => ({ changeType: "updated", record }),
    ),
    ...(changesObject.deletedRecords ?? []).map(
      (record): SalesforceRecordChange => ({ changeType: "deleted", record }),
    ),
  ];
};
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
    assertValidDateString(resumed.windowEnd, "cursor.windowEnd");
    const windowStart =
      resumed.windowStart === undefined
        ? watermark
        : assertValidDateString(resumed.windowStart, "cursor.windowStart");
    if (typeof resumed.isBackfill !== "boolean") {
      throw new Error(
        `Invalid polling cursor.isBackfill: ${JSON.stringify(resumed.isBackfill)}. Expected a boolean.`,
      );
    }
    if (resumed.lastId !== undefined && typeof resumed.lastId !== "string") {
      throw new Error(
        `Invalid polling cursor.lastId: ${JSON.stringify(resumed.lastId)}. Expected a string.`,
      );
    }
    return { ...resumed, windowStart };
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
    } satisfies PollingCursor;
  }
  if (lookBackDate) {
    return {
      watermark: lookBackDate,
      windowStart: lookBackDate,
      windowEnd: now,
      isBackfill: true,
    } satisfies PollingCursor;
  }
  return {
    watermark: now,
    windowStart: now,
    windowEnd: now,
    isBackfill: false,
  } satisfies PollingCursor;
};
export const resolveCursorSafely = (
  params: ResolveCursorParams & {
    logger: PollingLogger;
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
      `Discarding corrupted persisted polling cursor and restarting from lastPolledAt (or, if that is also absent, from the current time with no backfill unless a Look-back Date is configured): ${message}`,
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
        `Persisted state.lastPolledAt is also corrupted; discarding it too and restarting fresh from the current time (or performing a backfill, if a Look-back Date is configured): ${retryMessage}`,
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

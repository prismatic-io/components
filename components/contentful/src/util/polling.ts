import type {
  CollectionProp,
  EntryProps,
  Environment,
  KeyValueMap,
  QueryOptions,
} from "contentful-management";
import { MAX_POLL_PAGES, PAGINATION_LIMIT } from "../constants";
import type {
  PollingChangesObject,
  PollingRecordChange,
  PollingState,
} from "../types";
export const fetchEntriesSince = async (
  environment: Environment,
  lastPolledAt: string,
  contentType: string | undefined,
  maxPages: number = MAX_POLL_PAGES,
): Promise<{
  records: EntryProps<KeyValueMap>[];
  truncated: boolean;
}> => {
  const recordsById = new Map<string, EntryProps<KeyValueMap>>();
  let anchor = lastPolledAt;
  let seenAtAnchor = 0;
  for (let page = 0; page < maxPages; page++) {
    const query: QueryOptions = {
      "sys.updatedAt[gte]": anchor,
      order: "sys.updatedAt,sys.id",
      limit: PAGINATION_LIMIT,
      skip: seenAtAnchor,
    };
    if (contentType) {
      query.content_type = contentType;
    }
    const collection = await environment.getEntries(query);
    const data: CollectionProp<EntryProps<KeyValueMap>> =
      collection.toPlainObject();
    for (const item of data.items) {
      recordsById.set(item.sys.id, item);
    }
    if (data.items.length < PAGINATION_LIMIT) {
      return { records: [...recordsById.values()], truncated: false };
    }
    const pageNewest = data.items[data.items.length - 1].sys.updatedAt;
    if (pageNewest === anchor) {
      seenAtAnchor += data.items.length;
    } else {
      anchor = pageNewest;
      seenAtAnchor = data.items.filter(
        (item) => item.sys.updatedAt === pageNewest,
      ).length;
    }
  }
  return { records: [...recordsById.values()], truncated: true };
};
export const resolvePollingWindowStart = (
  state: PollingState | undefined,
  lookBackDate: string,
  now: string,
): {
  since: string;
  isInitialSync: boolean;
} => {
  if (state?.lastPolledAt) {
    return {
      since: state.lastPolledAt,
      isInitialSync: state.initialSyncInProgress === true,
    };
  }
  if (lookBackDate) {
    return { since: lookBackDate, isInitialSync: true };
  }
  return { since: now, isInitialSync: false };
};
export const partitionEntryChanges = (
  records: EntryProps<KeyValueMap>[],
  since: string,
  options: {
    showNewRecords: boolean;
    showUpdatedRecords: boolean;
    isInitialSync: boolean;
  },
): PollingChangesObject => {
  const sinceDate = new Date(since);
  const created: EntryProps<KeyValueMap>[] = [];
  const updated: EntryProps<KeyValueMap>[] = [];
  const includeNew = options.isInitialSync || options.showNewRecords;
  const includeUpdated = options.isInitialSync || options.showUpdatedRecords;
  for (const record of records) {
    const createdValue = record.sys?.createdAt;
    const createdAtDate =
      typeof createdValue === "string" ? new Date(createdValue) : null;
    const isNew = createdAtDate !== null && createdAtDate > sinceDate;
    if (isNew && includeNew) created.push(record);
    else if (!isNew && includeUpdated) updated.push(record);
  }
  return { created, updated };
};
export const computeNextCursor = (
  records: EntryProps<KeyValueMap>[],
  truncated: boolean,
  since: string,
  now: string,
): {
  nextCursor: string;
  stalled: boolean;
} => {
  if (!truncated) {
    return { nextCursor: now, stalled: false };
  }
  const newestUpdatedAt = records.reduce<string | undefined>(
    (newest, record) => {
      const updatedAt = record.sys?.updatedAt;
      if (typeof updatedAt !== "string") return newest;
      return newest === undefined ||
        new Date(updatedAt).getTime() > new Date(newest).getTime()
        ? updatedAt
        : newest;
    },
    undefined,
  );
  const nextCursor = newestUpdatedAt ?? since;
  const stalled = new Date(nextCursor).getTime() <= new Date(since).getTime();
  return { nextCursor, stalled };
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
export const pollEntryChanges = async (
  environment: Environment,
  state: PollingState | undefined,
  options: {
    lookBackDate: string;
    contentTypeId: string | undefined;
    showNewRecords: boolean;
    showUpdatedRecords: boolean;
    maxPages: number;
    now: string;
  },
): Promise<{
  changes: PollingChangesObject;
  nextState: PollingState;
  since: string;
  fetched: number;
  truncated: boolean;
  stalled: boolean;
  isInitialSync: boolean;
}> => {
  const { since, isInitialSync } = resolvePollingWindowStart(
    state,
    options.lookBackDate,
    options.now,
  );
  const { records, truncated } = await fetchEntriesSince(
    environment,
    since,
    options.contentTypeId,
    options.maxPages,
  );
  const changes = partitionEntryChanges(records, since, {
    showNewRecords: options.showNewRecords,
    showUpdatedRecords: options.showUpdatedRecords,
    isInitialSync,
  });
  const { nextCursor, stalled } = computeNextCursor(
    records,
    truncated,
    since,
    options.now,
  );
  return {
    changes,
    nextState: {
      lastPolledAt: nextCursor,
      initialSyncInProgress: isInitialSync && truncated,
    },
    since,
    fetched: records.length,
    truncated,
    stalled,
    isInitialSync,
  };
};

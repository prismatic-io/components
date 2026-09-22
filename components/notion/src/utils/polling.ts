import { MILLISECONDS_PER_MINUTE } from "../constants";
import type {
  NotionPage,
  NotionPaginationState,
  NotionRecordChange,
  PollingState,
} from "../types";
export const floorToMinute = (date: Date): string =>
  new Date(
    Math.floor(date.getTime() / MILLISECONDS_PER_MINUTE) *
      MILLISECONDS_PER_MINUTE,
  ).toISOString();
export const mergePollingCursor = (
  records: NotionPage[],
  carried?: {
    cursor: string;
    boundaryIds: string[];
  },
): {
  cursor: string;
  boundaryIds: string[];
} => {
  let cursor = carried?.cursor ?? "";
  let cursorMs = cursor ? new Date(cursor).getTime() : Number.NEGATIVE_INFINITY;
  let boundaryIds = [...(carried?.boundaryIds ?? [])];
  for (const record of records) {
    const editedMs = new Date(record.last_edited_time).getTime();
    if (Number.isNaN(editedMs)) continue;
    if (editedMs > cursorMs) {
      cursorMs = editedMs;
      cursor = record.last_edited_time;
      boundaryIds = [record.id];
    } else if (editedMs === cursorMs && !boundaryIds.includes(record.id)) {
      boundaryIds.push(record.id);
    }
  }
  return { cursor, boundaryIds };
};
export const resolveRoundState = (input: {
  nextCursor: string | null;
  windowStart: string;
  merged: {
    cursor: string;
    boundaryIds: string[];
  };
  previous: PollingState;
}): {
  nextState: NotionPaginationState | null;
  pollingState: PollingState;
} => {
  const { nextCursor, windowStart, merged, previous } = input;
  if (nextCursor === null) {
    return {
      nextState: null,
      pollingState: merged.cursor
        ? { lastPolledAt: merged.cursor, boundaryIds: merged.boundaryIds }
        : { lastPolledAt: windowStart },
    };
  }
  const nextState: NotionPaginationState = {
    windowStart,
    startCursor: nextCursor,
    cursor: merged.cursor,
    boundaryIds: merged.boundaryIds,
  };
  return {
    nextState,
    pollingState: {
      lastPolledAt: previous.lastPolledAt,
      ...(previous.boundaryIds ? { boundaryIds: previous.boundaryIds } : {}),
      inFlightCursor: nextState,
    },
  };
};
export const partitionRecordChanges = (
  records: NotionPage[],
  since: string,
  alreadyEmittedIds: readonly string[] = [],
): {
  created: NotionPage[];
  updated: NotionPage[];
} => {
  const emitted = new Set(alreadyEmittedIds);
  const sinceMs = new Date(since).getTime();
  const created: NotionPage[] = [];
  const updated: NotionPage[] = [];
  for (const record of records) {
    const createdMs = new Date(record.created_time).getTime();
    const editedMs = new Date(record.last_edited_time).getTime();
    const wasEmitted = emitted.has(record.id);
    if (wasEmitted && editedMs === sinceMs) continue;
    if (!wasEmitted && createdMs >= sinceMs) {
      created.push(record);
    } else if (editedMs >= sinceMs) {
      updated.push(record);
    }
  }
  return { created, updated };
};
export const splitDataSourceItems = (
  fetched: NotionPage[],
  windowStart: string,
  boundaryIds: readonly string[] = [],
): {
  newItems: NotionPage[];
  updatedItems: NotionPage[];
} => {
  const emitted = new Set(boundaryIds);
  const windowStartMs = new Date(windowStart).getTime();
  const excludeEmitted = (items: NotionPage[]) =>
    emitted.size === 0
      ? items
      : items.filter(
          (item) =>
            !emitted.has(item.id) ||
            new Date(item.last_edited_time).getTime() !== windowStartMs,
        );
  const created = fetched
    .filter((item) => new Date(item.created_time).getTime() >= windowStartMs)
    .sort(
      (a, b) =>
        new Date(a.created_time).getTime() - new Date(b.created_time).getTime(),
    );
  return {
    newItems: excludeEmitted(created),
    updatedItems: excludeEmitted(fetched),
  };
};
export const resolveRecordChanges = (
  newRecords: NotionPage[] | undefined,
  updatedRecords: NotionPage[] | undefined,
): NotionRecordChange[] => {
  const changes: NotionRecordChange[] = [];
  const seen = new Set<string>();
  for (const record of newRecords ?? []) {
    if (seen.has(record.id)) continue;
    seen.add(record.id);
    changes.push({ changeType: "new", record });
  }
  for (const record of updatedRecords ?? []) {
    if (seen.has(record.id)) continue;
    seen.add(record.id);
    changes.push({ changeType: "updated", record });
  }
  return changes;
};

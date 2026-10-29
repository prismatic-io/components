import { util } from "@prismatic-io/spectral";
import type { HttpClient } from "@prismatic-io/spectral/dist/clients/http";
import { MAX_PER_PAGE, POLL_RESOURCE_CONFIG } from "../constants";
import type {
  GitlabRecord,
  PlannedPoll,
  PollingChangesObject,
  PollingRecordChange,
  PollingState,
  PollResourceType,
} from "../types";
import { expectArray } from "./pagination";

export const pollResourceModel = Object.entries(POLL_RESOURCE_CONFIG).map(
  ([value, { label }]) => ({ label, value }),
);

export const resolvePollWindow = (
  lastState: PollingState | undefined,
  lookBackDate: string | undefined,
  now: Date,
): { sinceDate: Date; isBackfill: boolean } => ({
  sinceDate: lastState?.lastPolledAt
    ? new Date(lastState.lastPolledAt)
    : lookBackDate
      ? new Date(lookBackDate)
      : now,
  isBackfill:
    lastState?.isBackfill === true ||
    (!lastState?.lastPolledAt &&
      lookBackDate !== undefined &&
      lookBackDate !== ""),
});

export const fetchRecordsSince = async (
  client: HttpClient,
  project: string,
  pollResourceType: PollResourceType,
  sinceDate: Date,
  seenIds: string[] | undefined,
  maxRecords: number,
  pageSize: number = MAX_PER_PAGE,
): Promise<GitlabRecord[]> => {
  const path = `/projects/${project}/${POLL_RESOURCE_CONFIG[pollResourceType].path}`;
  const records: GitlabRecord[] = [];
  const indexById = new Map<string, number>();
  let cursor = sinceDate.getTime();
  let page = 1;
  while (true) {
    const response = await client.get<GitlabRecord[]>(path, {
      params: {
        updated_after: new Date(cursor).toISOString(),
        order_by: "updated_at",
        sort: "asc",
        per_page: pageSize,
        page,
      },
    });
    const data = expectArray<GitlabRecord>(response.data, path);
    let fresh = 0;
    for (const record of data) {
      const id = util.types.toString(record.id);
      const index = indexById.get(id);
      if (index === undefined) {
        indexById.set(id, records.length);
        records.push(record);
        fresh += 1;
      } else if (
        (recordTime(record) ?? cursor) > (recordTime(records[index]) ?? cursor)
      ) {
        records[index] = record;
        fresh += 1;
      }
    }
    if (
      hasFetchedBound(records, sinceDate, seenIds, maxRecords) ||
      data.length < pageSize
    ) {
      break;
    }
    const newest = data.reduce(
      (max, record) => Math.max(max, recordTime(record) ?? cursor),
      cursor,
    );
    if (newest > cursor) {
      cursor = newest;
      page = 1;
    } else if (page === 1 || fresh > 0) {
      page += 1;
    } else {
      break;
    }
  }
  return records;
};

const hasFetchedBound = (
  records: GitlabRecord[],
  sinceDate: Date,
  seenIds: string[] | undefined,
  maxRecords: number,
): boolean => {
  if (!Number.isFinite(maxRecords)) {
    return false;
  }
  const since = sinceDate.getTime();
  const inWindow = windowRecords(records, since, seenIds);
  if (inWindow.length <= maxRecords) {
    return false;
  }
  const boundTime = recordTime(inWindow[maxRecords - 1]) ?? since;
  const latest = records.reduce(
    (max, r) => Math.max(max, recordTime(r) ?? since),
    since,
  );
  return latest > boundTime;
};

const recordTime = (record: GitlabRecord): number | undefined => {
  const value = record.updated_at ?? record.created_at;
  return value ? new Date(value).getTime() : undefined;
};

const isAfterCursor = (
  time: number,
  id: string,
  since: number,
  seenIds: string[] | undefined,
): boolean =>
  time > since ||
  (seenIds !== undefined && time === since && !seenIds.includes(id));

const windowRecords = (
  records: GitlabRecord[],
  since: number,
  seenIds: string[] | undefined,
): GitlabRecord[] =>
  records
    .filter((record) => {
      const time = recordTime(record);
      return (
        time === undefined ||
        isAfterCursor(time, util.types.toString(record.id), since, seenIds)
      );
    })
    .sort(
      (a, b) =>
        (recordTime(a) ?? since) - (recordTime(b) ?? since) || a.id - b.id,
    );

const deliveryLimit = (
  records: GitlabRecord[],
  maxRecords: number,
  maxBytes: number,
): number => {
  const count = Math.min(records.length, maxRecords);
  if (!Number.isFinite(maxBytes)) {
    return count;
  }
  let bytes = 2;
  for (let i = 0; i < count; i++) {
    bytes += Buffer.byteLength(JSON.stringify(records[i])) + (i > 0 ? 1 : 0);
    if (bytes > maxBytes) {
      return Math.max(i, 1);
    }
  }
  return count;
};

export const planPoll = (
  records: GitlabRecord[],
  sinceDate: Date,
  seenIds: string[] | undefined,
  maxRecords: number,
  maxBytes: number = Number.POSITIVE_INFINITY,
): PlannedPoll => {
  const since = sinceDate.getTime();
  const inWindow = windowRecords(records, since, seenIds);

  const limit = deliveryLimit(inWindow, maxRecords, maxBytes);
  let delivered = inWindow.slice(0, limit);
  const complete = inWindow.length <= limit;
  if (!complete) {
    const lastTime = recordTime(delivered[delivered.length - 1]);
    if (
      lastTime !== undefined &&
      lastTime === recordTime(inWindow[delivered.length])
    ) {
      const beforeGroup = delivered.filter(
        (r) => (recordTime(r) ?? since) < lastTime,
      );
      if (beforeGroup.length > 0) {
        delivered = beforeGroup;
      }
    }
  }

  const cursor = delivered.reduce(
    (max, r) => Math.max(max, recordTime(r) ?? since),
    since,
  );
  const atCursor = delivered
    .filter((r) => recordTime(r) === cursor)
    .map((r) => util.types.toString(r.id));
  const carried = cursor === since ? (seenIds ?? []) : [];
  const lastSeenIds =
    seenIds === undefined && atCursor.length === 0
      ? undefined
      : [...new Set([...carried, ...atCursor])];

  const created: GitlabRecord[] = [];
  const updated: GitlabRecord[] = [];
  for (const record of delivered) {
    const createdAt = record.created_at
      ? new Date(record.created_at).getTime()
      : undefined;
    if (
      createdAt !== undefined &&
      isAfterCursor(createdAt, util.types.toString(record.id), since, seenIds)
    ) {
      created.push(record);
    } else {
      updated.push(record);
    }
  }

  return {
    created,
    updated,
    nextState: {
      lastPolledAt: new Date(cursor).toISOString(),
      ...(lastSeenIds ? { lastSeenIds } : {}),
    },
    complete,
  };
};

export const resolvePollingRecordChanges = (
  data: PollingChangesObject | undefined,
): PollingRecordChange[] => [
  ...(data?.created ?? []).map(
    (record): PollingRecordChange => ({ changeType: "created", record }),
  ),
  ...(data?.updated ?? []).map(
    (record): PollingRecordChange => ({ changeType: "updated", record }),
  ),
];

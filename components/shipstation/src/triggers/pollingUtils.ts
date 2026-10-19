import type { createShipStationClient } from "../client";
import type {
  PollingChangesObject,
  PollingRecordChange,
  PollingState,
  PollWindow,
  TimestampedRecord,
} from "../types";
const INITIAL_SYNC_SEED_MARGIN_MS = 24 * 60 * 60 * 1000;
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
export const classifyRecords = <T extends TimestampedRecord>(
  records: T[],
  window: PollWindow,
) => {
  const threshold = new Date(window.notBefore ?? window.after);
  return records.reduce(
    (previous, current) => {
      if (new Date(current.createDate) >= threshold) {
        previous.created.push(current);
      } else if (new Date(current.modifyDate) >= threshold) {
        previous.updated.push(current);
      }
      return previous;
    },
    { created: [] as T[], updated: [] as T[] },
  );
};
export const hasChanges = (result: {
  created: unknown[];
  updated: unknown[];
}) => result.created.length > 0 || result.updated.length > 0;
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
export const fetchAllPages = async <T = unknown>(
  client: ReturnType<typeof createShipStationClient>,
  endpoint: string,
  params: Record<string, unknown>,
  dataKey: string,
): Promise<T[]> => {
  let page = 1;
  const allRecords: T[] = [];
  let hasMore = true;
  while (hasMore) {
    const { data } = await client.get(endpoint, {
      params: { ...params, page, pageSize: 500 },
    });
    const records = data[dataKey] || data;
    allRecords.push(...(Array.isArray(records) ? records : []));
    hasMore = Array.isArray(records) && records.length === 500;
    page++;
  }
  return allRecords;
};

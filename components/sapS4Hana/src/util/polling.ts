import type { getSapClient } from "../client";
import type {
  PollingChangesObject,
  PollingRecordChange,
  PollingState,
  SapRecord,
} from "../types";

export const toSapDateTime = (isoString: string): string => {
  const d = new Date(isoString);
  return `datetime'${d.toISOString().replace("Z", "").split(".")[0]}'`;
};

export const fetchAllRecords = async (
  client: ReturnType<typeof getSapClient>,
  endpoint: string,
  filter: string,
): Promise<SapRecord[]> => {
  const allRecords: SapRecord[] = [];
  const pageSize = 500;
  let skip = 0;
  let hasMore = true;

  while (hasMore) {
    const url = `${endpoint}?$filter=${filter}&$top=${pageSize}&$skip=${skip}&$format=json`;
    const { data } = await client.get(url, {
      headers: { Accept: "application/json" },
    });

    const results = (data?.d?.results ?? []) as SapRecord[];
    allRecords.push(...results);

    hasMore = results.length >= pageSize;
    skip += pageSize;
  }

  return allRecords;
};

export const resolvePollWindow = (
  state: PollingState | undefined,
  lookBackDate: string | undefined,
  now: string,
): { since: string; isBackfill: boolean } => {
  if (state?.lastPolledAt) {
    return { since: state.lastPolledAt, isBackfill: false };
  }
  if (lookBackDate) {
    return { since: lookBackDate, isBackfill: true };
  }
  return { since: now, isBackfill: false };
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

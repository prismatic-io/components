import { util } from "@prismatic-io/spectral";
import type { HttpClient } from "@prismatic-io/spectral/dist/clients/http";
import { PollResource, SECONDS_PER_DAY } from "./constants";
import type { Pages } from "./interfaces";
import type {
  IntercomRecord,
  PollingChangesObject,
  PollingRecordChange,
  PollingState,
  PollWindow,
} from "./types";

export const cleanTimestamp = (value: unknown): string => {
  return util.types.toString(value);
};

export const cleanObject = (value: unknown) =>
  value ? util.types.toObject(value) : undefined;

export const cleanString = (value: unknown) =>
  value ? util.types.toString(value) : undefined;

const fetchData = async <T>(
  client: HttpClient,
  url: string,
  params: Record<string, unknown> | undefined = undefined,
): Promise<{
  data: T[];
  pages: Pages;
}> => {
  const {
    data: { data, pages },
  } = await client.get<{
    data: T[];
    pages: Pages;
  }>(url, { params });
  return {
    data,
    pages,
  };
};

export const paginateRecords = async <T>(
  client: HttpClient,
  params: Record<string, unknown> | undefined = undefined,
  fetchAll = false,
  url: string,
): Promise<{
  data: T[];
  pages: Pages | null;
}> => {
  if (!fetchAll) {
    const { data, pages } = await fetchData<T>(client, url, params);
    return {
      data,
      pages,
    };
  }

  let records: T[] = [];
  const per_page = 50;
  const keepFetching = true;
  let starting_after: string | undefined;
  let pagesObject: Pages | null = null;

  while (keepFetching) {
    const {
      data,
      pages,
    }: {
      data: T[];
      pages: Pages;
    } = await fetchData<T>(client, url, {
      per_page,
      starting_after: starting_after,
    });

    records = records.concat(data);
    starting_after = pages.next?.starting_after;
    if (!starting_after) {
      pagesObject = pages;
      break;
    }
  }

  return {
    data: records,
    pages: pagesObject,
  };
};

const searchContactsSince = async (
  client: HttpClient,
  lastPolledUnix: number,
): Promise<IntercomRecord[]> => {
  const query = {
    operator: "AND",
    value: [{ field: "updated_at", operator: ">", value: lastPolledUnix }],
  };

  const allContacts: IntercomRecord[] = [];
  let startingAfter: string | undefined;
  let hasMore = true;

  while (hasMore) {
    const { data } = await client.post<{
      data: IntercomRecord[];
      pages: Pages;
    }>("/contacts/search", {
      query,
      pagination: {
        per_page: 50,
        ...(startingAfter ? { starting_after: startingAfter } : {}),
      },
    });
    allContacts.push(...(data.data ?? []));
    startingAfter = data.pages?.next?.starting_after;
    hasMore = !!startingAfter;
  }

  return allContacts;
};

const fetchAllCompanies = async (
  client: HttpClient,
): Promise<IntercomRecord[]> => {
  const { data } = await paginateRecords<IntercomRecord>(
    client,
    undefined,
    true,
    "/companies",
  );
  return data;
};

const filterByUnixTimestamp = (
  records: IntercomRecord[],
  lastPolledUnix: number,
): { created: IntercomRecord[]; updated: IntercomRecord[] } => {
  const created: IntercomRecord[] = [];
  const updated: IntercomRecord[] = [];

  for (const record of records) {
    if (record.created_at > lastPolledUnix) {
      created.push(record);
    } else if (record.updated_at > lastPolledUnix) {
      updated.push(record);
    }
  }

  return { created, updated };
};

const LOOK_BACK_DATE_PATTERN = /^(\d{4})-(\d{2})-(\d{2})$/;

export const lookBackDateClean = (value: unknown): string => {
  const raw = util.types.toString(value).trim();
  if (raw === "") {
    return "";
  }

  const match = raw.match(LOOK_BACK_DATE_PATTERN);
  if (!match) {
    throw new Error(
      `Look-back Date must be a date in YYYY-MM-DD format. Received: ${raw}`,
    );
  }

  const [, yearStr, monthStr, dayStr] = match;
  const year = util.types.toNumber(yearStr);
  const month = util.types.toNumber(monthStr);
  const day = util.types.toNumber(dayStr);
  const parsed = new Date(Date.UTC(year, month - 1, day));
  if (
    parsed.getUTCFullYear() !== year ||
    parsed.getUTCMonth() !== month - 1 ||
    parsed.getUTCDate() !== day
  ) {
    throw new Error(
      `Look-back Date must be a date in YYYY-MM-DD format. Received: ${raw}`,
    );
  }

  if (parsed.getTime() > Date.now()) {
    throw new Error(`Look-back Date cannot be a future date. Received: ${raw}`);
  }

  return parsed.toISOString();
};

const toUnixSeconds = (iso: string): number =>
  Math.floor(new Date(iso).getTime() / 1000);

export const resolvePollWindow = (
  state: PollingState | undefined,
  lookBackDate: string | undefined,
  now: string,
): PollWindow => {
  if (state?.lastPolledAt) {
    const lastPolledUnix = toUnixSeconds(state.lastPolledAt);
    return {
      lastPolledUnix,
      searchSinceUnix: lastPolledUnix,
      isBackfill: false,
    };
  }
  if (lookBackDate) {
    const lookBackUnix = toUnixSeconds(lookBackDate);
    return {
      lastPolledUnix: lookBackUnix - 1,
      searchSinceUnix: lookBackUnix - SECONDS_PER_DAY,
      isBackfill: true,
    };
  }
  const nowUnix = toUnixSeconds(now);
  return {
    lastPolledUnix: nowUnix,
    searchSinceUnix: nowUnix,
    isBackfill: false,
  };
};

export const fetchChangedRecords = async (
  client: HttpClient,
  resourceType: string,
  window: PollWindow,
  { showNew, showUpdated }: { showNew: boolean; showUpdated: boolean },
): Promise<PollingChangesObject> => {
  const records =
    resourceType === PollResource.CONTACTS
      ? await searchContactsSince(client, window.searchSinceUnix)
      : await fetchAllCompanies(client);
  const { created, updated } = filterByUnixTimestamp(
    records,
    window.lastPolledUnix,
  );
  return {
    created: window.isBackfill || showNew ? created : [],
    updated: window.isBackfill || showUpdated ? updated : [],
  };
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

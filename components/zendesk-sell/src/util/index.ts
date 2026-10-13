import type { HttpClient } from "@prismatic-io/spectral/dist/clients/http";
import { LOOK_BACK_DATE_PATTERN } from "../constants";
import type {
  PollingState,
  PollWindow,
  ZendeskSellRecordChange,
  ZendeskSellRecordChanges,
  ZendeskSellResponse,
} from "../types";
export const fetchAllPages = async (
  client: HttpClient,
  endpoint: string,
  fetchAll: boolean,
  params: Record<string, unknown> = {},
): Promise<ZendeskSellResponse> => {
  if (!fetchAll) {
    const { data } = await client.get<ZendeskSellResponse>(endpoint, {
      params,
      headers: { Accept: "application/json" },
    });
    return data;
  }
  const allItems: unknown[] = [];
  let currentPage = 1;
  let hasMore = true;
  do {
    const { data } = await client.get<ZendeskSellResponse>(endpoint, {
      params: { ...params, page: currentPage, per_page: 100 },
      headers: { Accept: "application/json" },
    });
    const items = data?.items || [];
    allItems.push(...items);
    hasMore = !!data?.meta?.links?.next_page;
    currentPage += 1;
  } while (hasMore);
  return {
    items: allItems,
    meta: { links: {} },
  };
};
export const lookBackDateClean = (value: unknown): string => {
  if (
    value === undefined ||
    value === null ||
    (typeof value === "string" && value.trim() === "")
  ) {
    return "";
  }
  const raw = typeof value === "string" ? value.trim() : String(value);
  const match =
    typeof value === "string" ? raw.match(LOOK_BACK_DATE_PATTERN) : null;
  if (!match) {
    throw new Error(
      `Look-back Date must be a date in YYYY-MM-DD format. Received: ${raw}`,
    );
  }
  const [, yearStr, monthStr, dayStr] = match;
  const year = Number(yearStr);
  const month = Number(monthStr);
  const day = Number(dayStr);
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
export const resolvePollWindow = (
  state: PollingState | null | undefined,
  params: {
    lookBackDate: string;
    showNewRecords: boolean;
    showUpdatedRecords: boolean;
  },
  now: string,
): PollWindow => {
  const stored = state?.lastPolledAt;
  if (stored != null || !params.lookBackDate) {
    return {
      lastPolledAt: stored ?? now,
      includeNew: params.showNewRecords,
      includeUpdated: params.showUpdatedRecords,
    };
  }
  return {
    lastPolledAt: new Date(Date.parse(params.lookBackDate) - 1).toISOString(),
    includeNew: true,
    includeUpdated: true,
  };
};
export const resolveZendeskSellRecordChanges = (
  data: ZendeskSellRecordChanges | undefined,
): ZendeskSellRecordChange[] => {
  const changesObject = data ?? { created: [], updated: [] };
  return [
    ...(changesObject.created ?? []).map(
      (record): ZendeskSellRecordChange => ({ changeType: "created", record }),
    ),
    ...(changesObject.updated ?? []).map(
      (record): ZendeskSellRecordChange => ({ changeType: "updated", record }),
    ),
  ];
};

import type { Connection } from "@prismatic-io/spectral";
import type { HttpClient } from "@prismatic-io/spectral/dist/clients/http";
import type {
  SystemLogChange,
  SystemLogEvent,
  SystemLogsCursor,
  SystemLogsPollingState,
  SystemLogsWindow,
  SystemLogsWindowParams,
  UserChange,
} from "../interfaces/polling";
import type { User } from "../interfaces/user";
import {
  POLL_PAGE_SIZE,
  POLL_UNBATCHED_MAX_PAGES,
  POLL_UNBATCHED_PAGE_SIZE,
} from "./constants";

export const resolveUserChanges = (
  changeType: UserChange["changeType"],
  data: User[] | undefined,
): UserChange[] =>
  (data ?? []).map((record): UserChange => ({ changeType, record }));

export const resolveSystemLogChanges = (
  data: SystemLogEvent[] | undefined,
): SystemLogChange[] =>
  (data ?? []).map(
    (record): SystemLogChange => ({ changeType: "created", record }),
  );

export const usersPollParams = (
  connection: Connection,
  filter: string | undefined,
): {
  connection: Connection;
  pagination: { after: undefined; limit: undefined };
  sorting: { sortBy: undefined; sortOrder: undefined };
  filters: { search: undefined; filter: string | undefined; q: undefined };
  fetchAll: true;
  extraParameters: Record<string, never>;
} => ({
  connection,
  pagination: { after: undefined, limit: undefined },
  sorting: { sortBy: undefined, sortOrder: undefined },
  filters: { search: undefined, filter, q: undefined },
  fetchAll: true,
  extraParameters: {},
});

export const resolveSystemLogsLink = (
  held: SystemLogsCursor | SystemLogsPollingState,
  filter: string | undefined,
  baseUrl: string,
): string | undefined => {
  if (!held.next || (held.filter ?? undefined) !== filter) return undefined;
  try {
    return new URL(held.next).origin === new URL(baseUrl).origin
      ? held.next
      : undefined;
  } catch {
    return undefined;
  }
};

export const resolveSystemLogsSince = (
  state: SystemLogsPollingState,
  lookBackDate: string | undefined,
  now: Date,
): string =>
  state.lastUpdated ||
  (state.seeded || state.next ? undefined : lookBackDate) ||
  now.toISOString();

export const systemLogsWindowBounds = (
  batching: boolean,
): { pageSize: number; maxPages: number } => ({
  pageSize: batching ? POLL_PAGE_SIZE : POLL_UNBATCHED_PAGE_SIZE,
  maxPages: batching ? 1 : POLL_UNBATCHED_MAX_PAGES,
});

export const fetchSystemLogsWindow = async (
  client: HttpClient,
  { pageSize, maxPages, link, since, filter }: SystemLogsWindowParams,
): Promise<SystemLogsWindow> => {
  const events: SystemLogEvent[] = [];
  let next = link;
  for (let page = 0; page < maxPages; page++) {
    const { data, headers } = next
      ? await client.get<SystemLogEvent[]>(next)
      : await client.get<SystemLogEvent[]>("/logs", {
          params: { since, filter, limit: pageSize, sortOrder: "ASCENDING" },
        });
    const batch = Array.isArray(data) ? data : [];
    events.push(...batch);
    const issued = getNextLinkUrl(headers.link);
    next = issued ?? next;
    if (batch.length === 0 || !issued) return { events, hasMore: false, next };
  }
  return { events, hasMore: true, next };
};

export const getNextLinkUrl = (
  linkHeader: string | string[] | undefined,
): string | undefined => {
  const header = Array.isArray(linkHeader)
    ? linkHeader.join(",")
    : (linkHeader ?? "");
  for (const [, url, params] of header.matchAll(/<([^>]*)>([^<]*)/g)) {
    if (/;\s*rel="?next"?/i.test(params)) return url;
  }
  return undefined;
};

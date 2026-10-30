import { util } from "@prismatic-io/spectral";
import type { HttpClient } from "@prismatic-io/spectral/dist/clients/http";
import {
  ENDPOINTS,
  POLL_PAGE_SIZE,
  POLL_UNBATCHED_MAX_PAGES,
  POLLING_DEFAULT_FIELDS,
} from "../constants";
import type {
  IssuesWindowParams,
  JiraIssue,
  JiraIssueChange,
  JiraIssueChangesObject,
  PollingCursor,
  PollingState,
  PollingStream,
  StreamWindowParams,
} from "../types";

export const toJqlDate = (iso: string, timeZone: string): string => {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone,
    hourCycle: "h23",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  }).formatToParts(new Date(iso));
  const part = (type: string): string =>
    parts.find((p) => p.type === type)?.value ?? "";
  return `${part("year")}/${part("month")}/${part("day")} ${part("hour")}:${part("minute")}`;
};

const FALLBACK_TIME_ZONE = "UTC";

const isValidTimeZone = (zone: unknown): zone is string => {
  if (typeof zone !== "string" || zone.trim() === "") return false;
  try {
    new Intl.DateTimeFormat("en-US", { timeZone: zone });
    return true;
  } catch {
    return false;
  }
};

const resolveAccountTimeZone = async (
  client: HttpClient,
  logger: { warn: (message: string) => void },
): Promise<string> => {
  const { data } = await client.get("/myself");
  const zone = data?.timeZone;
  if (isValidTimeZone(zone)) return zone.trim();
  logger.warn(
    `The Jira account time zone could not be read from /myself; using ${FALLBACK_TIME_ZONE} for the JQL date filter.`,
  );
  return FALLBACK_TIME_ZONE;
};

const fetchIssuesWindow = async (
  client: HttpClient,
  {
    sinceISO,
    pageSize,
    maxPages,
    nextPageToken,
    additionalJql,
    timeZone,
  }: IssuesWindowParams,
): Promise<{ issues: JiraIssue[]; nextPageToken: string | undefined }> => {
  const updatedClause = `updated >= "${toJqlDate(sinceISO, timeZone)}"`;
  const jql = additionalJql
    ? `(${additionalJql}) AND ${updatedClause}`
    : updatedClause;

  const issues: JiraIssue[] = [];
  let token = nextPageToken;
  for (let page = 0; page < maxPages; page++) {
    const params: Record<string, unknown> = {
      jql,
      fields: POLLING_DEFAULT_FIELDS,
      maxResults: pageSize,
    };
    if (token) params.nextPageToken = token;

    const { data } = await client.get(ENDPOINTS.SEARCH_JQL, { params });
    issues.push(...((data?.issues ?? []) as JiraIssue[]));
    token = data?.nextPageToken || undefined;
    if (!token) break;
  }
  return { issues, nextPageToken: token };
};

export const fetchStreamWindow = async (
  createClient: () => Promise<HttpClient>,
  {
    skipFetch,
    heldTimeZone,
    nextPageToken,
    sinceISO,
    additionalJql,
    batching,
    logger,
  }: StreamWindowParams,
): Promise<{
  issues: JiraIssue[];
  nextPageToken: string | undefined;
  timeZone: string;
}> => {
  let timeZone = heldTimeZone ?? FALLBACK_TIME_ZONE;
  if (skipFetch) return { issues: [], nextPageToken: undefined, timeZone };
  const client = await createClient();
  if (!nextPageToken) timeZone = await resolveAccountTimeZone(client, logger);
  const window = await fetchIssuesWindow(client, {
    sinceISO,
    additionalJql,
    nextPageToken,
    timeZone,
    ...pollWindowBounds(batching),
  });
  return { ...window, timeZone };
};

export const buildPollingCursor = (
  nextPageToken: string | undefined,
  streamStartedAt: Date,
  timeZone: string,
  jqlFilter: string | undefined,
): PollingCursor | null =>
  nextPageToken
    ? {
        nextPageToken,
        streamStartedAt: streamStartedAt.toISOString(),
        timeZone,
        jqlFilter,
      }
    : null;

export const buildPollingState = (
  next: PollingCursor | null,
  streamStartedAt: Date,
  sinceDate: Date,
  isBackfill: boolean,
): PollingState => ({
  ...(next
    ? {
        nextPageToken: next.nextPageToken,
        streamStartedAt: next.streamStartedAt,
        timeZone: next.timeZone,
        ...(next.jqlFilter ? { jqlFilter: next.jqlFilter } : {}),
      }
    : {}),
  lastPolledAt: (next ? sinceDate : streamStartedAt).toISOString(),
  ...(isBackfill && next ? { backfillActive: true } : {}),
});

const pollWindowBounds = (
  batching: boolean,
): { pageSize: number; maxPages: number } => ({
  pageSize: POLL_PAGE_SIZE,
  maxPages: batching ? 1 : POLL_UNBATCHED_MAX_PAGES,
});

export const resolvePollingStart = (
  state: PollingState,
  lookBackDate: string | undefined,
  now: Date,
): { sinceDate: Date; isBackfill: boolean } => {
  const hasLookBackDate = lookBackDate !== undefined && lookBackDate !== "";
  const seedSince = hasLookBackDate ? util.types.toDate(lookBackDate) : now;
  return {
    sinceDate: state.lastPolledAt
      ? util.types.toDate(state.lastPolledAt)
      : seedSince,
    isBackfill:
      state.backfillActive === true || (!state.lastPolledAt && hasLookBackDate),
  };
};

export const resolvePollingStream = (
  state: PollingState,
  incoming: PollingCursor | undefined,
  jqlFilter: string | undefined,
  now: Date,
): PollingStream => {
  const held = incoming ?? state;
  const resumable =
    held.nextPageToken !== undefined &&
    held.nextPageToken !== "" &&
    (held.jqlFilter ?? undefined) === jqlFilter;
  return {
    nextPageToken: resumable ? held.nextPageToken : undefined,
    streamStartedAt:
      resumable && held.streamStartedAt
        ? util.types.toDate(held.streamStartedAt)
        : now,
    timeZone: resumable ? (held.timeZone ?? FALLBACK_TIME_ZONE) : undefined,
  };
};

export const resolveJiraIssueChanges = (
  data: JiraIssueChangesObject | undefined,
): JiraIssueChange[] => {
  const changesObject = data ?? { created: [], updated: [] };
  return [
    ...(changesObject.created ?? []).map(
      (record): JiraIssueChange => ({ changeType: "created", record }),
    ),
    ...(changesObject.updated ?? []).map(
      (record): JiraIssueChange => ({ changeType: "updated", record }),
    ),
  ];
};

export const partitionIssuesByTimestamp = (
  issues: JiraIssue[],
  since: Date,
): {
  created: JiraIssue[];
  updated: JiraIssue[];
} => {
  const created: JiraIssue[] = [];
  const updated: JiraIssue[] = [];
  for (const issue of issues) {
    const createdValue = issue.fields?.created;
    const createdDate =
      typeof createdValue === "string" ? new Date(createdValue) : null;
    const isNew =
      createdDate !== null &&
      !Number.isNaN(createdDate.getTime()) &&
      createdDate > since;
    if (isNew) created.push(issue);
    else updated.push(issue);
  }
  return { created, updated };
};

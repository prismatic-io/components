import crypto from "node:crypto";
import type { TriggerPayload } from "@prismatic-io/spectral";
import { util } from "@prismatic-io/spectral";
import type { HttpClient } from "@prismatic-io/spectral/dist/clients/http";
import {
  DEFAULT_PAGE_SIZE,
  LINK_HEADER_NEXT,
  LOOK_BACK_DATE_PATTERN,
  MAX_BATCHED_RECORDS,
} from "./constants";
import type {
  GithubIssueRecord,
  PollingChangesObject,
  PollingRecordChange,
  PollingState,
} from "./interfaces/PollingState";
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
export const resolvePollingRecordChanges = (
  data: PollingChangesObject | undefined,
): PollingRecordChange[] => {
  const changesObject = data ?? {};
  return [
    ...(changesObject.created ?? []).map(
      (record): PollingRecordChange => ({ changeType: "created", record }),
    ),
    ...(changesObject.updated ?? []).map(
      (record): PollingRecordChange => ({ changeType: "updated", record }),
    ),
  ];
};
export const floorToSecond = (value: string): string =>
  new Date(Math.floor(Date.parse(value) / 1000) * 1000)
    .toISOString()
    .replace(".000Z", "Z");
const secondsOf = (value: string | undefined): number | null => {
  if (!value) return null;
  const ms = Date.parse(value);
  return Number.isNaN(ms) ? null : Math.floor(ms / 1000);
};
const recordTimestamp = (record: GithubIssueRecord): string | undefined =>
  record.updated_at ?? record.created_at;
export const splitIssueChanges = (
  issues: GithubIssueRecord[],
  lastPolledAt: string,
  deliveredIds: number[] = [],
): {
  created: GithubIssueRecord[];
  updated: GithubIssueRecord[];
} => {
  const cutoff = secondsOf(lastPolledAt);
  const delivered = new Set(deliveredIds);
  const created: GithubIssueRecord[] = [];
  const updated: GithubIssueRecord[] = [];
  const inWindow = (at: number | null, id: number): boolean =>
    at !== null &&
    cutoff !== null &&
    (at > cutoff || (at === cutoff && !delivered.has(id)));
  for (const issue of issues) {
    if (inWindow(secondsOf(issue.created_at), issue.id)) created.push(issue);
    else if (inWindow(secondsOf(issue.updated_at), issue.id))
      updated.push(issue);
  }
  return { created, updated };
};
const advanceCursor = (
  issues: GithubIssueRecord[],
  lastPolledAt: string,
): string => {
  let watermark = lastPolledAt;
  let watermarkAt = secondsOf(lastPolledAt) ?? 0;
  for (const issue of issues) {
    const timestamp = recordTimestamp(issue);
    const at = secondsOf(timestamp);
    if (timestamp && at !== null && at > watermarkAt) {
      watermark = floorToSecond(timestamp);
      watermarkAt = at;
    }
  }
  return watermark;
};
const capHoldsSameSecondGroup = (
  issues: GithubIssueRecord[],
  lastPolledAt: string,
): boolean => {
  const cutoff = secondsOf(lastPolledAt);
  return (
    issues.length >= MAX_BATCHED_RECORDS &&
    issues.every((issue) => secondsOf(recordTimestamp(issue)) === cutoff)
  );
};
export const nextPollingState = (
  previous: PollingState | undefined,
  fetched: GithubIssueRecord[],
  delivered: GithubIssueRecord[],
  lastPolledAt: string,
  backfillActive: boolean,
): PollingState => {
  const watermark = advanceCursor(fetched, lastPolledAt);
  const carried =
    watermark === lastPolledAt ? (previous?.lastSeenIds ?? []) : [];
  const boundary = delivered
    .filter((r) => secondsOf(recordTimestamp(r)) === secondsOf(watermark))
    .map((r) => r.id);
  return {
    lastPolledAt: watermark,
    lastSeenIds: [...new Set([...carried, ...boundary])],
    ...(backfillActive ? { backfillActive: true } : {}),
  };
};
export const paginateResults = async <T>(
  client: HttpClient,
  url: string,
  fetchAll: boolean,
  params?: Record<string, any>,
  maxRecords?: number,
): Promise<T[]> => {
  const results: T[] = [];
  if (!fetchAll) {
    const { data } = await client.get<T[]>(url, {
      params,
    });
    results.push(...data);
    return results;
  }
  let page = 1;
  const per_page = DEFAULT_PAGE_SIZE;
  let link = "";
  do {
    const { data, headers } = await client.get<T[]>(url, {
      params: { ...params, per_page, page },
    });
    results.push(...data);
    link = headers["link"];
    page += 1;
  } while (
    link &&
    link.includes(LINK_HEADER_NEXT) &&
    (maxRecords === undefined || results.length < maxRecords)
  );
  return maxRecords === undefined ? results : results.slice(0, maxRecords);
};
export const fetchIssuesSince = async (
  client: HttpClient,
  path: string,
  since: string,
  isBatching: boolean,
): Promise<{
  issues: GithubIssueRecord[];
  stalled: boolean;
}> => {
  const query = { since, sort: "updated", direction: "asc", state: "all" };
  const issues = await paginateResults<GithubIssueRecord>(
    client,
    path,
    true,
    query,
    isBatching ? MAX_BATCHED_RECORDS : undefined,
  );
  if (isBatching && capHoldsSameSecondGroup(issues, since)) {
    const whole = await paginateResults<GithubIssueRecord>(
      client,
      path,
      true,
      query,
    );
    return { issues: whole, stalled: true };
  }
  return { issues, stalled: false };
};
export const sortBy =
  <T>(key: keyof T) =>
  (a: T, b: T) => {
    return a[key] < b[key] ? -1 : 1;
  };
export const toOptionalNumber = (value: unknown): number | undefined =>
  util.types.toNumber(value) || undefined;
export const cleanString = (value: unknown) =>
  util.types.toString(value) || undefined;
export const toOptionalBool = (value: unknown): boolean | undefined =>
  util.types.toBool(value) || undefined;
export const cleanOptionalJson = (value: unknown) => {
  if (!value) {
    return undefined;
  }
  const raw = util.types.toString(value);
  return util.types.isJSON(raw) ? JSON.parse(raw) : value;
};
export const validateWebhookSignature = (
  payload: TriggerPayload,
  secret?: string,
): void => {
  if (!secret) {
    return;
  }
  const headers = util.types.lowerCaseHeaders(payload.headers);
  const signature = headers["x-hub-signature-256"];
  const body = util.types.toString(payload.rawBody.data);
  const computedSignature = crypto
    .createHmac("sha256", secret)
    .update(body)
    .digest("hex");
  if (signature !== `sha256=${computedSignature}`) {
    throw new Error(
      "The included signing signature does not match the configured GitHub signing key. Rejecting.",
    );
  }
};

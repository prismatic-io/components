import { createHash } from "node:crypto";
import type { ActionLogger } from "@prismatic-io/spectral";
import type { HttpClient } from "@prismatic-io/spectral/dist/clients/http";
import {
  DAY_MS,
  EVENT_STEPS_MAX_PAGES,
  EVENT_STEPS_OVERLAP_DAYS,
  ISO_DATE_LENGTH,
  ISO_MINUTES_LENGTH,
  ISO_SECONDS_LENGTH,
  ISO_TIME_START,
  MS_PER_SECOND,
  POLLING_OVERLAP_MS,
  POLLING_SEEN_MAX,
  SERVICES,
  WQL_DATE_VALUE_PATTERN,
  WQL_LAST_POLLED_AT_PLACEHOLDER,
  WQL_MAX_CACHED_ROWS,
} from "../constants";
import type {
  EventStepChange,
  EventStepChangesObject,
  EventStepFilters,
  EventStepSelection,
  PollingState,
  PollingWindow,
  RaasReportResponse,
  RecordChange,
  RecordChangesObject,
  RecordSelection,
  WatermarkFormat,
  WorkdayEventStep,
  WorkdayListResponse,
  WorkdayRecord,
  WqlCursor,
  WqlCursorOptions,
} from "../types";
import { parseReportUrl } from "./workdayUrls";
const stableStringify = (value: unknown): string => {
  if (Array.isArray(value)) {
    return `[${value.map(stableStringify).join(",")}]`;
  }
  if (value && typeof value === "object") {
    const entries = Object.entries(value as Record<string, unknown>)
      .sort(([a], [b]) => a.localeCompare(b))
      .map(
        ([key, entry]) => `${JSON.stringify(key)}:${stableStringify(entry)}`,
      );
    return `{${entries.join(",")}}`;
  }
  return JSON.stringify(value) ?? "null";
};
const toWqlDateTimeLiteral = (iso: string): string =>
  `'${iso.slice(0, ISO_DATE_LENGTH)} ${iso.slice(ISO_TIME_START, ISO_SECONDS_LENGTH)}Z'`;
const fingerprintRecord = (
  record: WorkdayRecord,
  recordKeyField: string,
): string => {
  const key = record[recordKeyField];
  if (key === undefined || key === null || key === "") {
    throw new Error(
      `Record Key Field "${recordKeyField}" is missing from a returned row. Columns in the row: ${Object.keys(record).join(", ") || "none"}.`,
    );
  }
  return createHash("sha256")
    .update(`${stableStringify(key)}\u0000${stableStringify(record)}`)
    .digest("hex")
    .slice(0, ISO_MINUTES_LENGTH);
};
const capSeenEntries = (
  entries: string[],
  noun: string,
  logger?: Pick<ActionLogger, "warn">,
): string[] => {
  if (entries.length > POLLING_SEEN_MAX) {
    logger?.warn(
      `The polling window returned ${entries.length} distinct ${noun}, more than the ${POLLING_SEEN_MAX} kept in polling state to skip duplicates. Kept the last ${POLLING_SEEN_MAX}; any of the other ${entries.length - POLLING_SEEN_MAX} that the next window returns unchanged is delivered again. Narrow the window or run the trigger more often.`,
    );
  }
  return entries.slice(-POLLING_SEEN_MAX);
};
export const getPollingWindow = (
  state: PollingState | undefined,
  lookBackDate: string,
  now: string,
): PollingWindow => {
  if (state?.lastPolledAt) {
    const since = new Date(
      new Date(state.lastPolledAt).getTime() - POLLING_OVERLAP_MS,
    ).toISOString();
    return { since, isInitialSync: false, isBaseline: false };
  }
  if (lookBackDate) {
    return { since: lookBackDate, isInitialSync: true, isBaseline: false };
  }
  const since = new Date(
    new Date(now).getTime() - POLLING_OVERLAP_MS,
  ).toISOString();
  return { since, isInitialSync: false, isBaseline: true };
};
export const getWqlWindow = (
  state: PollingState | undefined,
  lookBackDate: string,
  now: string,
  overlapMs = 0,
): PollingWindow =>
  state?.watermark
    ? {
        since: new Date(
          Math.max(0, new Date(state.watermark).getTime() - overlapMs),
        ).toISOString(),
        isInitialSync: false,
        isBaseline: false,
      }
    : getPollingWindow(state, lookBackDate, now);
export const getEventStepsWindow = (
  state: PollingState | undefined,
  lookBackDate: string,
  now: string,
): PollingWindow => {
  if (!state?.lastPolledAt && lookBackDate) {
    return { since: lookBackDate, isInitialSync: true, isBaseline: false };
  }
  const reference = new Date(state?.lastPolledAt ?? now).getTime();
  const since = new Date(
    reference - EVENT_STEPS_OVERLAP_DAYS * DAY_MS,
  ).toISOString();
  return { since, isInitialSync: false, isBaseline: !state?.lastPolledAt };
};
export const formatRaasWatermark = (
  iso: string,
  format: WatermarkFormat,
): string =>
  format === "date"
    ? iso.slice(0, ISO_DATE_LENGTH)
    : `${iso.slice(0, ISO_SECONDS_LENGTH)}Z`;
export const applyWqlWatermark = (query: string, since: string): string => {
  if (!query.includes(WQL_LAST_POLLED_AT_PLACEHOLDER)) {
    throw new Error(
      `Query must contain ${WQL_LAST_POLLED_AT_PLACEHOLDER} where the trigger inserts the window start, compared against a date-time field of the data source: WHERE <dateTimeField> >= ${WQL_LAST_POLLED_AT_PLACEHOLDER}.`,
    );
  }
  return query
    .split(WQL_LAST_POLLED_AT_PLACEHOLDER)
    .join(toWqlDateTimeLiteral(since));
};
export const buildRaasPollingUrl = (
  reportUrl: string,
  baseUrl: string,
  prompts: Record<string, unknown> | undefined,
  watermarkPrompt: string,
  watermark: string,
): URL => {
  const url = parseReportUrl(reportUrl, baseUrl);
  for (const [key, value] of Object.entries(prompts ?? {})) {
    url.searchParams.set(key, String(value));
  }
  url.searchParams.set(watermarkPrompt, watermark);
  url.searchParams.set("format", "json");
  return url;
};
export const fetchRaasReportRows = async (
  client: HttpClient,
  url: URL,
): Promise<WorkdayRecord[]> => {
  const { data } = await client.get<RaasReportResponse<WorkdayRecord>>(
    url.href,
    { responseType: "json" },
  );
  if (!data || typeof data !== "object" || Array.isArray(data)) {
    throw new Error(
      "The report did not return a JSON object. Confirm the Report URL points to a custom report enabled as a web service.",
    );
  }
  return data.Report_Entry ?? [];
};
export const fetchEventStepsSince = async (
  client: HttpClient,
  filters: EventStepFilters,
  pageSize: number,
): Promise<WorkdayEventStep[]> => {
  const steps: WorkdayEventStep[] = [];
  for (let page = 0; page < EVENT_STEPS_MAX_PAGES; page++) {
    const { data } = await client.get<WorkdayListResponse<WorkdayEventStep>>(
      `${SERVICES.businessProcess}/eventSteps`,
      {
        params: { ...filters, limit: pageSize, offset: steps.length },
        paramsSerializer: { indexes: null },
      },
    );
    const rows = data.data ?? [];
    steps.push(...rows);
    const reachedTotal =
      typeof data.total === "number"
        ? steps.length >= data.total
        : rows.length < pageSize;
    if (rows.length === 0 || reachedTotal) return steps;
  }
  throw new Error(
    `More than ${EVENT_STEPS_MAX_PAGES * pageSize} event steps were created in one window. Narrow the trigger with Business Process or Step Type.`,
  );
};
export const selectChangedRecords = (
  records: WorkdayRecord[],
  recordKeyField: string,
  window: PollingWindow,
  previouslySeen: string[] = [],
  logger?: Pick<ActionLogger, "warn">,
): RecordSelection => {
  const prior = new Set(previouslySeen);
  const changed: WorkdayRecord[] = [];
  const seen = new Set<string>();
  for (const record of records) {
    const fingerprint = fingerprintRecord(record, recordKeyField);
    if (seen.has(fingerprint)) continue;
    seen.add(fingerprint);
    if (
      !window.isBaseline &&
      (window.isInitialSync || !prior.has(fingerprint))
    ) {
      changed.push(record);
    }
  }
  return { changed, seen: capSeenEntries([...seen], "rows", logger) };
};
const parseWqlDateValue = (value: unknown): number | undefined => {
  if (typeof value !== "string") return undefined;
  const match = WQL_DATE_VALUE_PATTERN.exec(value.trim());
  if (!match) return undefined;
  const [, date, time, offset] = match;
  if (!time) return Date.parse(date);
  const isoOffset = (offset ?? "Z").replace(/^([+-]\d{2})(\d{2})$/, "$1:$2");
  const parsed = Date.parse(`${date}T${time}${isoOffset}`);
  return Number.isNaN(parsed) ? undefined : parsed;
};
export const advanceWqlWatermark = (
  records: WorkdayRecord[],
  { dateField, recordKeyField, floor, overlapMs }: WqlCursorOptions,
  logger?: Pick<ActionLogger, "warn">,
): WqlCursor => {
  const dated = records.flatMap((record) => {
    const time = parseWqlDateValue(record[dateField]);
    return time === undefined ? [] : [{ record, time }];
  });
  if (records.length > 0 && dated.length === 0) {
    throw new Error(
      `Date Field "${dateField}" has no date or date-time value in any of the ${records.length} returned rows, so the trigger cannot tell where the next window starts. Select it in the query and enter the name of the column that the WHERE clause compares to ${WQL_LAST_POLLED_AT_PLACEHOLDER}. Columns in the first row: ${Object.keys(records[0]).join(", ") || "none"}.`,
    );
  }
  if (dated.length < records.length) {
    logger?.warn(
      `${records.length - dated.length} of ${records.length} rows had no date or date-time value in "${dateField}" and did not move the watermark.`,
    );
  }
  if (dated.length === 0) return { watermark: floor };
  const floorTime = new Date(floor).getTime();
  const watermark = Math.max(floorTime, ...dated.map(({ time }) => time));
  const nextStart =
    Math.floor(Math.max(0, watermark - overlapMs) / MS_PER_SECOND) *
    MS_PER_SECOND;
  const remembered = dated
    .filter(({ time }) => time >= nextStart)
    .map(({ record }) => fingerprintRecord(record, recordKeyField));
  return {
    watermark:
      watermark === floorTime ? floor : new Date(watermark).toISOString(),
    seen:
      remembered.length > 0
        ? capSeenEntries([...new Set(remembered)], "rows", logger)
        : undefined,
  };
};
export const selectNewEventSteps = (
  steps: WorkdayEventStep[],
  window: PollingWindow,
  previouslySeen: string[],
  nextWindowStart: string,
  logger?: Pick<ActionLogger, "warn">,
): EventStepSelection => {
  const prior = new Set(previouslySeen);
  const nextStartDate = nextWindowStart.slice(0, ISO_DATE_LENGTH);
  const unique = [...new Map(steps.map((step) => [step.id, step])).values()];
  const created = window.isBaseline
    ? []
    : unique.filter((step) => window.isInitialSync || !prior.has(step.id));
  const createdOrder = (step: WorkdayEventStep) =>
    step.creationDate ?? "\uffff";
  const seen = unique
    .filter((step) => !step.creationDate || step.creationDate >= nextStartDate)
    .sort((a, b) => createdOrder(a).localeCompare(createdOrder(b)))
    .map((step) => step.id);
  return {
    created,
    seen: capSeenEntries([...new Set(seen)], "event steps", logger),
  };
};
export const resolveRecordChanges = (
  data: RecordChangesObject | undefined,
): RecordChange[] =>
  (data?.changed ?? []).map(
    (record): RecordChange => ({ changeType: "changed", record }),
  );
export const resolveEventStepChanges = (
  data: EventStepChangesObject | undefined,
): EventStepChange[] =>
  (data?.created ?? []).map(
    (record): EventStepChange => ({ changeType: "created", record }),
  );
export const assertWqlWindowComplete = (
  response: WorkdayListResponse,
  isInitialSync: boolean,
): void => {
  if (response.total > response.data.length) {
    const remedy = isInitialSync
      ? "Choose a later Look-back Date or narrow the query's WHERE clause."
      : "The Look-back Date only applies to the first run, so changing it has no effect now. Narrow the query's WHERE clause, or run the trigger more often so each window is smaller.";
    throw new Error(
      `The query matched ${response.total} rows, more than the ${WQL_MAX_CACHED_ROWS} Workday can page through in one window. ${remedy}`,
    );
  }
};

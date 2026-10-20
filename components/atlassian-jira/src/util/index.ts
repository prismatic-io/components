import {
  type Connection,
  type KeyValuePair,
  util,
} from "@prismatic-io/spectral";
import type { HttpClient } from "@prismatic-io/spectral/dist/clients/http";
import { isAtlassianBasicAuth } from "atlassian-utils";
import { downloadFile } from "../connections/auth";
import { CONNECTION_KEYS } from "../connections";
import {
  ARRAY_ERROR_MESSAGE,
  EMPTY_ARRAY_ERROR_MESSAGE,
  EMPTY_INPUT_ERROR_MESSAGE,
  ENDPOINTS,
  LOOK_BACK_DATE_PATTERN,
  POLL_PAGE_SIZE,
  POLL_UNBATCHED_MAX_PAGES,
  POLLING_DEFAULT_FIELDS,
} from "../constants";
import type {
  Attachment,
  AttachmentResponse,
  Issue,
  IssuesWindowParams,
  JiraIssue,
  JiraIssueChange,
  JiraIssueChangesObject,
  PaginatedResponse,
  PollingCursor,
  PollingState,
  PollingStream,
  StreamWindowParams,
} from "../types";
export const isBasicAuth = (connection: Connection): boolean =>
  isAtlassianBasicAuth(connection, CONNECTION_KEYS);
export const validateDescription = (
  description?: string,
  ADFdescription?: object,
) => {
  if (description && ADFdescription) {
    throw new Error(
      `You can only provide a description, either "Description" or "ADF Description".`,
    );
  }
  if (description) {
    return {
      content: [
        {
          content: [
            {
              text: description,
              type: "text",
            },
          ],
          type: "paragraph",
        },
      ],
      type: "doc",
      version: 1,
    };
  }
  if (ADFdescription) {
    return ADFdescription;
  }
  return undefined;
};
export const getIssueType = (
  name: string,
  id: string,
  required = true,
):
  | {
      name?: string;
      id?: string;
    }
  | undefined => {
  const NO_CHARACTERS = 0;
  let namePresent = false;
  let idPresent = false;
  if (name) namePresent = name.length > NO_CHARACTERS;
  if (id) idPresent = id.length > NO_CHARACTERS;
  if (namePresent && idPresent) {
    throw new Error(
      `You can only provide a value for the type of issue, either "Issue Type Name" or "Issue Type ID".`,
    );
  }
  if (required) {
    if (!namePresent && !idPresent) {
      throw new Error(
        `You must provide a value for the type of issue, either "Issue Type Name" or "Issue Type ID".`,
      );
    }
    return {
      ...(namePresent && { name }),
      ...(idPresent && { id }),
    };
  }
  return undefined;
};
export const projectIdsClean = (
  rawValue: unknown,
): {
  projectId: string;
  projectName?: string;
}[] => {
  if (!Array.isArray(rawValue)) {
    return [{ projectId: util.types.toString(rawValue) }];
  }
  if (util.types.isObjectSelection(rawValue)) {
    return rawValue.map(({ object: { label, key } }) => ({
      projectId: key,
      projectName: label,
    }));
  }
  return rawValue.map((val) => ({ projectId: util.types.toString(val) }));
};
export const labelsClean = (rawLabels): string[] | undefined => {
  if (Array.isArray(rawLabels)) {
    const labelsArray = rawLabels.map((label) => util.types.toString(label));
    return labelsArray.length > 0 ? labelsArray : undefined;
  }
  return undefined;
};
export const recordsInputClean = (value: unknown) => {
  const NO_LENGTH = 0;
  const valueAsString = util.types.toString(value);
  const recordsString = valueAsString.trim();
  if (value) {
    if (recordsString.length === NO_LENGTH) {
      throw new Error(EMPTY_INPUT_ERROR_MESSAGE);
    }
    const records: Record<string, string>[] = JSON.parse(recordsString);
    if (!Array.isArray(records)) {
      throw new Error(ARRAY_ERROR_MESSAGE);
    }
    if (records.length === NO_LENGTH) {
      throw new Error(EMPTY_ARRAY_ERROR_MESSAGE);
    }
    return records;
  }
  return undefined;
};
export const dynamicFieldsClean = (value: unknown): KeyValuePair[] => {
  if (value) {
    const data = recordsInputClean(value);
    data.forEach((pair) => {
      if (!("key" in pair) || !("value" in pair)) {
        throw new TypeError(
          "Each item in dynamicValues should be a key-value pair",
        );
      }
    });
    return value as KeyValuePair[];
  }
  return undefined;
};
export const fieldValuesClean = (value: unknown) =>
  util.types.keyValPairListToObject(
    util.types.toObject(dynamicFieldsClean(value)) as KeyValuePair[],
  );
export const cleanCodeInput = (value: unknown) => {
  if (value) {
    const object = util.types.toObject(value);
    if (Array.isArray(object)) {
      return object as Attachment[];
    }
    throw new Error("The input must be an array of strings");
  }
  return undefined;
};
export const cleanAttachmentArray = (value: unknown) => {
  const attachmentArray = cleanCodeInput(value);
  attachmentArray?.forEach((attachment) => {
    if (!attachment.id || !attachment.mimeType) {
      throw new Error(
        "Each attachment object must have an 'id' and a 'mimeType' property",
      );
    }
  });
  return attachmentArray;
};
export const downloadIssueAttachment = async (
  client: HttpClient,
  jiraConnection: Connection,
  issueId: string,
) => {
  const { data: issueData } = await client.get(`/issue/${issueId}`);
  const attachmentData = issueData.fields?.attachment[0];
  if (!attachmentData) {
    throw new Error("Unable to find any attachments on the given issue.");
  }
  const { content: contentUrl, mimeType: contentType } = attachmentData;
  if (!contentUrl && !contentType) {
    throw new Error("Unable to find download link on the given attachment.");
  }
  const data = await downloadFile(jiraConnection, contentUrl);
  return {
    data,
    contentType,
  };
};
export const downloadArrayOfAttachments = async (
  jiraConnection: Connection,
  baseUrl: string,
  attachmentIds: Attachment[],
): Promise<AttachmentResponse[]> => {
  const data = await Promise.all(
    attachmentIds.map(async ({ id, mimeType }) => ({
      data: await downloadFile(
        jiraConnection,
        `${baseUrl}/attachment/content/${id}`,
      ),
      contentType: mimeType,
    })),
  );
  return data;
};
export const getAttachmentsFromIssue = (data: Issue) => {
  const attachments =
    data.fields.attachment.map(({ id, mimeType }) => ({
      id,
      mimeType,
    })) || [];
  return attachments as Attachment[];
};
export const downloadAttachmentsFromIssue = async (
  data: Issue,
  jiraConnection: Connection,
  baseUrl: string,
) => {
  const attachments = getAttachmentsFromIssue(data);
  return await downloadArrayOfAttachments(jiraConnection, baseUrl, attachments);
};
export const getIssueById = async (
  client: HttpClient,
  issueId: string,
): Promise<Issue> => {
  const { data } = await client.get(`/issue/${issueId}`);
  return data;
};
export const getPaginatedData = async <T>(
  client: HttpClient,
  url: string,
  fetchAll: boolean,
  isBasicAuth = false,
) => {
  const response: {
    data: PaginatedResponse<T>;
  } = await client.get(url);
  if (!fetchAll || isBasicAuth) return response;
  let isLast = response.data.isLast;
  let startAt = response.data.startAt;
  const total = response.data.total;
  const allData = [...response.data.values];
  const maxResults = response.data.maxResults;
  const totalPages = Math.ceil(total / maxResults);
  let currentPage = 1;
  while (!isLast && currentPage < totalPages) {
    startAt += maxResults;
    currentPage += 1;
    const { data: newData } = await client.get(url, {
      params: { maxResults, startAt },
    });
    allData.push(...newData.values);
    isLast = newData.isLast;
  }
  return {
    data: {
      ...response.data,
      values: allData,
    },
  };
};
export const toOptionalString = (value: unknown): string | undefined =>
  value ? util.types.toString(value) : undefined;
export const toOptionalObject = (value: unknown) =>
  value ? util.types.toObject(value) : undefined;
export const toOptionalNumber = (value: unknown): number | undefined =>
  value ? util.types.toNumber(value) : undefined;
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
  logger: {
    warn: (message: string) => void;
  },
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
): Promise<{
  issues: JiraIssue[];
  nextPageToken: string | undefined;
}> => {
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
): {
  pageSize: number;
  maxPages: number;
} => ({
  pageSize: POLL_PAGE_SIZE,
  maxPages: batching ? 1 : POLL_UNBATCHED_MAX_PAGES,
});
export const resolvePollingStart = (
  state: PollingState,
  lookBackDate: string | undefined,
  now: Date,
): {
  sinceDate: Date;
  isBackfill: boolean;
} => {
  const seedSince = lookBackDate ? new Date(lookBackDate) : now;
  return {
    sinceDate: state.lastPolledAt ? new Date(state.lastPolledAt) : seedSince,
    isBackfill:
      state.backfillActive === true ||
      (!state.lastPolledAt && Boolean(lookBackDate)),
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
    Boolean(held.nextPageToken) && (held.jqlFilter ?? undefined) === jqlFilter;
  return {
    nextPageToken: resumable ? held.nextPageToken : undefined,
    streamStartedAt:
      resumable && held.streamStartedAt ? new Date(held.streamStartedAt) : now,
    timeZone: resumable ? (held.timeZone ?? FALLBACK_TIME_ZONE) : undefined,
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

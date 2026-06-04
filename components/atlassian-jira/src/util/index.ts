import { type Connection, type KeyValuePair, util } from "@prismatic-io/spectral";
import type { HttpClient } from "@prismatic-io/spectral/dist/clients/http";
import { isAtlassianBasicAuth } from "atlassian-utils";
import { downloadFile } from "../connections/auth";
import { CONNECTION_KEYS } from "../connections";
import {
  ARRAY_ERROR_MESSAGE,
  EMPTY_ARRAY_ERROR_MESSAGE,
  EMPTY_INPUT_ERROR_MESSAGE,
  ENDPOINTS,
  MAX_POLLING_PAGES,
  POLLING_DEFAULT_FIELDS,
} from "../constants";
import type { Attachment, AttachmentResponse, Issue, JiraIssue, PaginatedResponse } from "../types";






export const isBasicAuth = (connection: Connection): boolean =>
  isAtlassianBasicAuth(connection, CONNECTION_KEYS);

export const validateDescription = (description?: string, ADFdescription?: object) => {
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
): { name?: string; id?: string } | undefined => {
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
): { projectId: string; projectName?: string }[] => {
  
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
        throw new TypeError("Each item in dynamicValues should be a key-value pair");
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
      throw new Error("Each attachment object must have an 'id' and a 'mimeType' property");
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
      data: await downloadFile(jiraConnection, `${baseUrl}/attachment/content/${id}`),
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

export const getIssueById = async (client: HttpClient, issueId: string): Promise<Issue> => {
  const { data } = await client.get(`/issue/${issueId}`);
  return data;
};

export const getPaginatedData = async <T>(
  client: HttpClient,
  url: string,
  fetchAll: boolean,
  isBasicAuth = false,
) => {
  const response: { data: PaginatedResponse<T> } = await client.get(url);

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



const pad = (n: number): string => util.types.toString(n).padStart(2, "0");
export const toJqlDate = (iso: string): string => {
  const d = new Date(iso);
  return `${d.getUTCFullYear()}/${pad(d.getUTCMonth() + 1)}/${pad(d.getUTCDate())} ${pad(d.getUTCHours())}:${pad(d.getUTCMinutes())}`;
};









export const fetchUpdatedIssuesSince = async (
  client: HttpClient,
  sinceISO: string,
  additionalJql?: string,
): Promise<JiraIssue[]> => {
  const updatedClause = `updated >= "${toJqlDate(sinceISO)}"`;
  const jql = additionalJql ? `(${additionalJql}) AND ${updatedClause}` : updatedClause;

  const collected: JiraIssue[] = [];
  let nextPageToken: string | undefined;
  let pageCount = 0;

  do {
    const params: Record<string, unknown> = {
      jql,
      fields: POLLING_DEFAULT_FIELDS,
    };
    if (nextPageToken) params.nextPageToken = nextPageToken;

    const { data } = await client.get(ENDPOINTS.SEARCH_JQL, { params });
    const issues = (data?.issues ?? []) as JiraIssue[];
    collected.push(...issues);
    nextPageToken = data?.nextPageToken;
    pageCount += 1;
  } while (nextPageToken && pageCount < MAX_POLLING_PAGES);

  return collected;
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
    const createdDate = typeof createdValue === "string" ? new Date(createdValue) : null;
    const isNew =
      createdDate !== null && !Number.isNaN(createdDate.getTime()) && createdDate > since;
    if (isNew) created.push(issue);
    else updated.push(issue);
  }
  return { created, updated };
};

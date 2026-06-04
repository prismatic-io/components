import crypto from "node:crypto";
import { type KeyValuePair, util } from "@prismatic-io/spectral";
import type { Attachment } from "./interfaces/Attachment";
import { gmail_v1 } from "@googleapis/gmail";
import Gmail = gmail_v1.Gmail;
import { MAX_HISTORY_ITEMS_PER_REQUEST, MAX_MESSAGES_PER_REQUEST } from "./constants";

export const cleanAttachmentsData = (attachments: unknown): Attachment[] => {
  let attachmentsData = attachments;
  if (!attachmentsData) {
    return [];
  }

  
  if (typeof attachmentsData === "string") {
    try {
      attachmentsData = JSON.parse(attachmentsData);
    } catch (error) {
      throw new Error(`Attachments data is not a valid JSON string: ${error}`);
    }
  }

  if (!Array.isArray(attachmentsData)) {
    throw new Error("Attachments must be an array");
  }

  if (attachmentsData.length === 0) {
    return [];
  }

  return (attachmentsData as KeyValuePair[]).map((attachment, index) => {
    if (typeof attachment !== "object" || attachment === null) {
      throw new Error(`Attachment at index ${index} is not an object`);
    }

    const { key, value } = attachment;

    if (typeof key !== "string") {
      throw new Error(`Attachment at index ${index} does not have a valid 'key' property`);
    }

    if (value === undefined) {
      throw new Error(`Attachment at index ${index} does not have a 'value' property`);
    }

    let bufferContent: Buffer;
    try {
      bufferContent = util.types.toBufferDataPayload(value).data;
    } catch (error) {
      throw new Error(
        `Attachment at index ${index} does not have a valid 'value' property that can be parsed to Buffer: ${error}`,
      );
    }

    return {
      filename: key,
      content: bufferContent,
    };
  });
};

export const cleanNumberInput = (value: unknown) =>
  value ? util.types.toNumber(value) : undefined;

export const listAllMessages = async (
  client: Gmail,
  params: gmail_v1.Params$Resource$Users$Messages$List,
  fetchAll: boolean,
  addMetadata: boolean,
): Promise<gmail_v1.Schema$ListMessagesResponse> => {
  let allMessages: gmail_v1.Schema$Message[] = [];
  let nextPageToken: string | undefined;
  let resultSizeEstimate = 0;

  if (fetchAll) {
    params.pageToken = undefined;
    params.maxResults = MAX_MESSAGES_PER_REQUEST;
  }

  do {
    const { data } = await client.users.messages.list(params);
    nextPageToken = data.nextPageToken;
    resultSizeEstimate = data.resultSizeEstimate;
    if (data.messages && data.messages.length > 0) {
      allMessages.push(...data.messages);
    }

    params.pageToken = nextPageToken;
  } while (fetchAll && nextPageToken);

  if (addMetadata) {
    allMessages = await Promise.all(
      allMessages.map(async (message) => {
        const { data } = await client.users.messages.get({
          id: message.id,
          format: "metadata",
          userId: params.userId,
        });
        return data;
      }),
    );
  }

  return {
    messages: allMessages,
    nextPageToken,
    resultSizeEstimate: fetchAll ? allMessages.length : resultSizeEstimate,
  };
};

export const cleanStringInput = (value: unknown) =>
  value ? util.types.toString(value) : undefined;

export function getBase64FromUrl(url: string): string {
  const lastPathSegmentMatch = url.match(/\/([^\/]+)$/);
  return lastPathSegmentMatch ? lastPathSegmentMatch[1] : "";
}

export const listAllHistory = async (
  client: Gmail,
  params: gmail_v1.Params$Resource$Users$History$List,
  fetchAll: boolean,
): Promise<gmail_v1.Schema$ListHistoryResponse> => {
  const allHistory: gmail_v1.Schema$History[] = [];
  let nextPageToken: string | undefined;
  let historyId: string | undefined;

  if (fetchAll) {
    params.pageToken = undefined;
    params.maxResults = MAX_HISTORY_ITEMS_PER_REQUEST;
  }

  do {
    const { data } = await client.users.history.list(params);
    nextPageToken = data.nextPageToken;
    historyId = data.historyId;
    if (data.history && data.history.length > 0) {
      allHistory.push(...data.history);
    }

    params.pageToken = nextPageToken;
  } while (fetchAll && nextPageToken);

  return {
    history: allHistory,
    nextPageToken,
    historyId,
  };
};

export const generatePrefixedHash = (
  prefix: string,
  primaryValue: string,
  secondaryValue?: string,
): string => {
  const base = secondaryValue ? `${primaryValue}${secondaryValue}` : primaryValue;
  const hash = crypto.createHash("md5").update(base).digest("hex").substring(0, 20);
  return `${prefix}_${hash}`;
};

import type { Connection, KeyValuePair } from "@prismatic-io/spectral";
import { ConnectionError, util } from "@prismatic-io/spectral";
import isEmpty from "lodash.isempty";
import type { Message } from "@microsoft/microsoft-graph-types";
import type {
  MessageChange,
  MessageChangesObject,
  MessagesWindow,
  MessagesWindowParams,
  PaginatedResponse,
  PollingCursor,
  PollingState,
  PollingStream,
  PollingWindowRequest,
} from "../types";
import type { HttpClient } from "@prismatic-io/spectral/dist/clients/http";
import connections, { oauthClientCredentials } from "../connections";
import { createClient } from "../client";
import { createMsWebhookPerformFN } from "ms-utils";
import {
  LOOK_BACK_DATE_PATTERN,
  MESSAGES_DEFAULT_ORDERBY,
  POLL_PAGE_SIZE,
  POLL_UNBATCHED_MAX_PAGES,
  POLLING_ENDPOINTS,
  RENEWAL_EXPIRATION_MINUTES,
  WATERMARK_SKEW_MARGIN_MS,
  WEBHOOK_RESOURCE_CONFIG,
} from "../constants";
export const filterFalsyValuesFromArray = (array: unknown[]) => {
  return array.filter((value) => !isEmpty(value));
};
export const cleanFunctionForBccAndCcInputs = (values: unknown): string[] => {
  if (!values) return [];
  const filteredValues = filterFalsyValuesFromArray(
    values as unknown[],
  ) as string[];
  if (!filteredValues?.length) return [];
  return filteredValues.reduce((acc: string[], address: string) => {
    return acc.concat(address.split(","));
  }, [] as string[]);
};
export const cleanAttachments = (
  values: unknown,
  inputName: string,
): unknown[] => {
  if (!values) return [];
  try {
    const attachments = util.types.toObject(values);
    if (Array.isArray(attachments)) {
      if (attachments?.length) {
        const data = ((attachments as KeyValuePair[]) || []).map(
          (attachment) => {
            if (typeof attachment !== "object" || attachment === null) {
              throw new Error("Attachment is not an object");
            }
            const { data, contentType } = util.types.toBufferDataPayload(
              attachment.value,
            );
            return {
              "@odata.type": "#microsoft.graph.fileAttachment",
              name: attachment.key,
              contentBytes: data.toString("base64"),
              contentType,
            };
          },
        );
        return data;
      }
      return [];
    }
  } catch (error) {
    console.error(error);
  }
  throw new Error(`${inputName} must be an array of files`);
};
export const fetchAllData = async <T>(
  client: HttpClient,
  url: string,
  fetchAll: boolean,
  params: Record<string, unknown> = {},
): Promise<PaginatedResponse<T>> => {
  const results: T[] = [];
  let nextLink: string | undefined;
  let firstResponse: PaginatedResponse<T> | undefined;
  do {
    const { data } = await client.get<PaginatedResponse<T>>(
      nextLink || url,
      nextLink
        ? undefined
        : {
            params: fetchAll
              ? Object.fromEntries(
                  Object.entries(params).filter(
                    ([key]) => !["$top", "$skip"].includes(key),
                  ),
                )
              : params,
          },
    );
    if (!firstResponse) {
      firstResponse = data;
    }
    results.push(...data.value);
    nextLink = data["@odata.nextLink"];
    if (!fetchAll) {
      break;
    }
  } while (nextLink);
  if (!firstResponse) {
    throw new Error("No response received from the API");
  }
  const response = {
    "@odata.context": firstResponse["@odata.context"],
    value: results,
  };
  if (fetchAll) {
    return response;
  }
  if (firstResponse["@odata.nextLink"]) {
    return {
      ...response,
      "@odata.nextLink": firstResponse["@odata.nextLink"],
    };
  }
  return response;
};
export const cleanStringInput = (value: unknown) =>
  value ? util.types.toString(value) : undefined;
export const validateConnection = (connection: Connection) => {
  if (!connections.map((c) => c.key).includes(connection.key)) {
    throw new ConnectionError(
      connection,
      `Invalid connection: ${connection.key}`,
    );
  }
  return true;
};
export const computeEndpointBasedOnConnection = (
  connection: Connection,
  endpoint: string,
) => {
  if (connection.key !== oauthClientCredentials.key) {
    return endpoint;
  }
  return endpoint.replace("/me", `/users/${connection.fields.userId}`);
};
const toWholeSecond = (value: string | number | Date): string => {
  const date = new Date(value);
  date.setUTCMilliseconds(0);
  return date.toISOString();
};
const modifiedStamp = (message: Message): string | undefined => {
  const parsed = message.lastModifiedDateTime
    ? Date.parse(message.lastModifiedDateTime)
    : Number.NaN;
  return Number.isNaN(parsed) ? undefined : toWholeSecond(parsed);
};
const safeHorizon = (now: Date): string =>
  toWholeSecond(now.getTime() - WATERMARK_SKEW_MARGIN_MS);
const fetchMessagesWindow = async (
  client: HttpClient,
  connection: Connection,
  { position, horizonISO, folderId, pageSize, maxPages }: MessagesWindowParams,
): Promise<MessagesWindow> => {
  const endpoint = computeEndpointBasedOnConnection(
    connection,
    folderId
      ? POLLING_ENDPOINTS.MAIL_FOLDER_MESSAGES(folderId)
      : POLLING_ENDPOINTS.MESSAGES,
  );
  const messages: Message[] = [];
  let { watermark } = position;
  let boundaryIds = [...position.boundaryIds];
  const take = (rows: Message[]) => {
    for (const row of rows) {
      const stamp = modifiedStamp(row);
      if (stamp === undefined) {
        messages.push(row);
        continue;
      }
      if (stamp < watermark) continue;
      const id = row.id ?? "";
      if (stamp === watermark) {
        if (boundaryIds.includes(id)) continue;
        boundaryIds.push(id);
      } else {
        watermark = stamp;
        boundaryIds = [id];
      }
      messages.push(row);
    }
  };
  let drained = false;
  for (let page = 0; page < maxPages && !drained; page++) {
    const startWatermark = watermark;
    const startCount = boundaryIds.length;
    let { data } = await client.get<PaginatedResponse<Message>>(endpoint, {
      params: {
        $filter: `lastModifiedDateTime ge ${watermark} and lastModifiedDateTime le ${horizonISO}`,
        $orderby: MESSAGES_DEFAULT_ORDERBY,
        $top: pageSize,
      },
    });
    take(data.value ?? []);
    const noProgress =
      watermark === startWatermark && boundaryIds.length === startCount;
    if (
      data["@odata.nextLink"] &&
      (noProgress || boundaryIds.length >= pageSize)
    ) {
      const stalledAt = watermark;
      while (data["@odata.nextLink"] && watermark === stalledAt) {
        ({ data } = await client.get<PaginatedResponse<Message>>(
          data["@odata.nextLink"],
        ));
        take(data.value ?? []);
      }
    }
    drained = !data["@odata.nextLink"];
  }
  return { messages, position: { watermark, boundaryIds }, drained };
};
const pollWindowBounds = (
  batching: boolean,
): {
  pageSize: number;
  maxPages: number;
} => ({
  pageSize: POLL_PAGE_SIZE,
  maxPages: batching ? 1 : POLL_UNBATCHED_MAX_PAGES,
});
export const readPollingWindow = async (
  connection: Connection,
  { position, folderId, skipFetch, batching, debug, now }: PollingWindowRequest,
): Promise<MessagesWindow> => {
  const horizonISO = safeHorizon(now);
  if (skipFetch) {
    return {
      messages: [],
      position:
        horizonISO > position.watermark
          ? { watermark: horizonISO, boundaryIds: [] }
          : position,
      drained: true,
    };
  }
  return fetchMessagesWindow(createClient(connection, debug), connection, {
    position,
    horizonISO,
    folderId,
    ...pollWindowBounds(batching),
  });
};
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
  incoming: Partial<PollingCursor> | undefined,
  folderId: string | undefined,
  sinceDate: Date,
): PollingStream => {
  const resumable = (held: Partial<PollingCursor> | PollingState): boolean =>
    typeof held.watermark === "string" &&
    (held.folderId ?? undefined) === folderId;
  const held =
    incoming && resumable(incoming)
      ? incoming
      : resumable(state)
        ? state
        : undefined;
  if (held?.watermark) {
    return {
      position: {
        watermark: toWholeSecond(held.watermark),
        boundaryIds: Array.isArray(held.boundaryIds) ? held.boundaryIds : [],
      },
      classifySince: held.classifySince ?? state.lastPolledAt ?? held.watermark,
    };
  }
  return {
    position: { watermark: toWholeSecond(sinceDate), boundaryIds: [] },
    classifySince: sinceDate.toISOString(),
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
export const resolveMessageChanges = (
  data: MessageChangesObject | undefined,
): MessageChange[] => {
  const changesObject = data ?? { created: [], updated: [] };
  return [
    ...(changesObject.created ?? []).map(
      (record): MessageChange => ({ changeType: "created", record }),
    ),
    ...(changesObject.updated ?? []).map(
      (record): MessageChange => ({ changeType: "updated", record }),
    ),
  ];
};
export const partitionMessagesByTimestamp = (
  messages: import("@microsoft/microsoft-graph-types").Message[],
  since: Date,
): {
  created: import("@microsoft/microsoft-graph-types").Message[];
  updated: import("@microsoft/microsoft-graph-types").Message[];
} => {
  const created: import("@microsoft/microsoft-graph-types").Message[] = [];
  const updated: import("@microsoft/microsoft-graph-types").Message[] = [];
  for (const message of messages) {
    const createdValue = message.createdDateTime;
    const createdDate =
      typeof createdValue === "string" ? new Date(createdValue) : null;
    const isNew =
      createdDate !== null &&
      !Number.isNaN(createdDate.getTime()) &&
      createdDate > since;
    if (isNew) created.push(message);
    else updated.push(message);
  }
  return { created, updated };
};
export const createWebhookPerformFN = (resourceType?: string) => {
  const resourceConfig = resourceType
    ? WEBHOOK_RESOURCE_CONFIG[resourceType]
    : undefined;
  return createMsWebhookPerformFN({
    createClient,
    renewalExpirationMinutes: RENEWAL_EXPIRATION_MINUTES,
    fetchResourceData: resourceConfig
      ? async (client, notification, _context, params) => {
          const resourceId = util.types.toString(
            notification?.resourceData?.id,
          );
          const endpoint = `${resourceConfig.endpoint}/${resourceId}`;
          const { data } = await client.get(
            computeEndpointBasedOnConnection(
              params.connection as Connection,
              endpoint,
            ),
          );
          return { key: resourceConfig.dataKey, data };
        }
      : undefined,
  });
};

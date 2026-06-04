import type { Connection, KeyValuePair } from "@prismatic-io/spectral";
import { ConnectionError, util } from "@prismatic-io/spectral";
import isEmpty from "lodash.isempty";
import type { PaginatedResponse } from "../types";
import type { HttpClient } from "@prismatic-io/spectral/dist/clients/http";
import connections, { oauthClientCredentials } from "../connections";
import { createClient } from "../client";
import { createMsWebhookPerformFN } from "ms-utils";
import {
  MESSAGES_DEFAULT_ORDERBY,
  POLLING_ENDPOINTS,
  RENEWAL_EXPIRATION_MINUTES,
  WEBHOOK_RESOURCE_CONFIG,
} from "../constants";

export const filterFalsyValuesFromArray = (array: unknown[]) => {
  return array.filter((value) => !isEmpty(value));
};

export const cleanFunctionForBccAndCcInputs = (values: unknown): string[] => {
  if (!values) return [];

  const filteredValues = filterFalsyValuesFromArray(values as unknown[]) as string[];
  if (!filteredValues?.length) return [];
  return filteredValues.reduce((acc: string[], address: string) => {
    return acc.concat(address.split(","));
  }, [] as string[]);
};

export const cleanAttachments = (values: unknown, inputName: string): unknown[] => {
  if (!values) return [];
  try {
    const attachments = util.types.toObject(values);
    if (Array.isArray(attachments)) {
      if (attachments?.length) {
        const data = ((attachments as KeyValuePair[]) || []).map((attachment) => {
          if (typeof attachment !== "object" || attachment === null) {
            throw new Error("Attachment is not an object");
          }
          const { data, contentType } = util.types.toBufferDataPayload(attachment.value);
          return {
            "@odata.type": "#microsoft.graph.fileAttachment",
            name: attachment.key,
            contentBytes: data.toString("base64"),
            contentType,
          };
        });
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
                  Object.entries(params).filter(([key]) => !["$top", "$skip"].includes(key)),
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
    throw new ConnectionError(connection, `Invalid connection: ${connection.key}`);
  }
  return true;
};

export const computeEndpointBasedOnConnection = (connection: Connection, endpoint: string) => {
  if (connection.key !== oauthClientCredentials.key) {
    
    return endpoint;
  }

  
  
  
  
  
  
  
  
  

  return endpoint.replace("/me", `/users/${connection.fields.userId}`);
};











export const fetchUpdatedMessagesSince = async (
  client: HttpClient,
  connection: Connection,
  sinceISO: string,
  folderId?: string,
): Promise<import("@microsoft/microsoft-graph-types").Message[]> => {
  const endpoint = computeEndpointBasedOnConnection(
    connection,
    folderId ? POLLING_ENDPOINTS.MAIL_FOLDER_MESSAGES(folderId) : POLLING_ENDPOINTS.MESSAGES,
  );

  const data = await fetchAllData<import("@microsoft/microsoft-graph-types").Message>(
    client,
    endpoint,
    true,
    {
      $filter: `lastModifiedDateTime gt ${sinceISO}`,
      $orderby: MESSAGES_DEFAULT_ORDERBY,
    },
  );
  return data.value ?? [];
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
    const createdDate = typeof createdValue === "string" ? new Date(createdValue) : null;
    const isNew =
      createdDate !== null && !Number.isNaN(createdDate.getTime()) && createdDate > since;
    if (isNew) created.push(message);
    else updated.push(message);
  }
  return { created, updated };
};

export const createWebhookPerformFN = (resourceType?: string) => {
  const resourceConfig = resourceType ? WEBHOOK_RESOURCE_CONFIG[resourceType] : undefined;

  return createMsWebhookPerformFN({
    createClient,
    renewalExpirationMinutes: RENEWAL_EXPIRATION_MINUTES,
    fetchResourceData: resourceConfig
      ? async (client, notification, _context, params) => {
          const resourceId = util.types.toString(notification?.resourceData?.id);
          const endpoint = `${resourceConfig.endpoint}/${resourceId}`;
          const { data } = await client.get(
            computeEndpointBasedOnConnection(params.connection as Connection, endpoint),
          );
          return { key: resourceConfig.dataKey, data };
        }
      : undefined,
  });
};

import {
  ActionContext,
  type ActionLogger,
  type PollingContext,
  type TriggerPayload,
  util,
} from "@prismatic-io/spectral";
import type BoxClient from "box-node-sdk/lib/box-client";
import type {
  NewOrUpdatedFilesResult,
  PollingResult,
  PollingState,
  WebhookTriggerType,
} from "./interfaces";

interface GetFolderEntriesParams {
  client: BoxClient;
  id: string;
  marker?: string;
  limit?: number;
  offset?: number;
  fields?: string;
}

export const getFolderEntries = async ({
  client,
  id,
  limit,
  marker,
  offset,
  fields,
}: GetFolderEntriesParams) => {
  let initial = true;
  let allEntries = [];

  while (initial || marker) {
    const response = await client.folders.getItems(id, {
      usemarker: "true",
      marker,
      limit,
      offset,
      fields,
    });

    initial = false;
    allEntries = allEntries.concat(response.entries);
    marker = response.next_marker;
  }

  return allEntries;
};

export const getAllWebhookEntries = async (client: BoxClient) => {
  let initial = true;
  let allEntries = [];
  let marker: string | undefined;

  while (initial || marker) {
    const response = await client.webhooks.getAll({
      limit: 1000,
      marker,
    });

    initial = false;
    allEntries = allEntries.concat(response.entries);
    marker = response.next_marker;
  }

  return { entries: allEntries };
};

export const getPathEntries = async (
  client: BoxClient,
  path: string,
  lastShouldExist = true,
) => {
  if (!path.startsWith("/")) {
    throw Error("Path must start with '/'");
  }
  if (path === "/") {
    path = "";
  }
  
  let allEntries = [
    {
      id: "0",
      name: "",
      type: "folder",
    },
  ];

  const pathEntries = [];
  const pathParts = path.split("/");

  
  
  
  
  for (const [i, part] of pathParts.entries()) {
    const isLastPart = i === pathParts.length - 1;
    const { id, type, name } =
      allEntries.find((entry) => entry.name === part) || {};

    if (id) {
      if (isLastPart && !lastShouldExist) {
        throw Error(`Expected '${part}' to not exist`);
      }

      pathEntries.push({ id, type, name });

      
      
      if (type === "folder" && !isLastPart) {
        allEntries = await getFolderEntries({ client, id });
      }
    } else if (isLastPart && !lastShouldExist) {
      pathEntries.push({ name: part });
    } else {
      throw Error("Path not found");
    }
  }

  return pathEntries;
};

export const cleanCommaSeparatedString = (
  value: unknown,
): string | undefined => {
  if (!value) return undefined;

  const str = util.types.toString(value);
  return str
    .split(",")
    .map((item) => item.trim())
    .filter((item) => item !== "")
    .join(",");
};

export const humanizeEnumLabel = (value: string): string => {
  return (
    value
      
      .replace(/_/g, " ")
      
      .replace(/\./g, " ")
      
      .toLowerCase()
      
      .replace(/\b\w/g, (char) => char.toUpperCase())
  );
};

export const createWebhookFN = async (
  client: BoxClient,
  targetId: string,
  targetType: string,
  address: string,
  triggerTypes: WebhookTriggerType[],
  storeKey: string,
  logger: ActionLogger,
  primarySignatureKey: string,
  secondarySignatureKey: string,
) => {
  const { id: webhookId } = await client.webhooks.create(
    targetId,
    targetType,
    address,
    triggerTypes as WebhookTriggerType[],
  );

  logger.info("New webhook created, storing state...");

  return {
    crossFlowState: {
      [storeKey]: {
        existingWebhookId: webhookId,
        primarySignatureKey: primarySignatureKey,
        secondarySignatureKey: secondarySignatureKey,
      },
    },
    webhookId,
  };
};

export const getStoreKey = (
  targetId: string,
  targetType: string,
  flowName: string,
) => {
  return `boxTrigger-${targetId}-${targetType}-${flowName}`;
};

export const buildPollingResult = <T>(
  payload: TriggerPayload,
  data: NewOrUpdatedFilesResult<T>,
): PollingResult<T> => ({
  payload: { ...payload, body: { data } },
});

export const getLastPolledAt = (
  context: PollingContext,
  defaultLastPolledAt: string,
) => {
  return (
    (context.polling.getState() as PollingState).lastPolledAt ||
    defaultLastPolledAt
  );
};

export const normalizeDatesBetweenEntries = <
  T extends { created_at?: string; modified_at?: string },
>(
  entries: T[],
) => {
  return entries.map(({ created_at, modified_at, ...entry }) => {
    return {
      ...entry,
      created_at: created_at ? new Date(created_at).toISOString() : undefined,
      modified_at: modified_at
        ? new Date(modified_at).toISOString()
        : undefined,
    };
  });
};

export const computeNewEntries = <
  T extends { created_at?: string; modified_at?: string },
>(
  entries: T[],
  lastPolledAt: string,
) => {
  return entries.filter((entry) => entry.created_at > lastPolledAt);
};

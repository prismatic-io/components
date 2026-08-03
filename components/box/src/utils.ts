import { createHmac, timingSafeEqual } from "node:crypto";
import {
  ActionContext,
  type ActionLogger,
  type PollingContext,
  type TriggerPayload,
  util,
} from "@prismatic-io/spectral";
import type { BoxClient } from "box-node-sdk";
import type { CreateWebhookRequestBody } from "box-node-sdk/lib/managers/webhooks";
import type {
  NewOrUpdatedFilesResult,
  PollingResult,
  PollingState,
  WebhookTriggerType,
} from "./interfaces";
export type CreateWebhookBody = CreateWebhookRequestBody;
type BoxRawEntry = Record<string, unknown>;
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
}: GetFolderEntriesParams): Promise<BoxRawEntry[]> => {
  let initial = true;
  let allEntries: BoxRawEntry[] = [];
  while (initial || marker) {
    const response = await client.folders.getFolderItems(id, {
      queryParams: {
        usemarker: true,
        marker,
        limit,
        offset,
        fields: fields ? fields.split(",") : undefined,
      },
    });
    initial = false;
    allEntries = allEntries.concat(
      (response.entries ?? []).map((entry) => entry.rawData as BoxRawEntry),
    );
    marker = response.nextMarker;
  }
  return allEntries;
};
export const getAllWebhookEntries = async (
  client: BoxClient,
): Promise<{
  entries: BoxRawEntry[];
}> => {
  let initial = true;
  let allEntries: BoxRawEntry[] = [];
  let marker: string | undefined;
  while (initial || marker) {
    const response = await client.webhooks.getWebhooks({
      limit: 1000,
      marker,
    });
    initial = false;
    allEntries = allEntries.concat(
      (response.entries ?? []).map((entry) => entry.rawData as BoxRawEntry),
    );
    marker = response.nextMarker;
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
  let allEntries: BoxRawEntry[] = [
    {
      id: "0",
      name: "",
      type: "folder",
    },
  ];
  const pathEntries: {
    id?: string;
    type?: string;
    name?: string;
  }[] = [];
  const pathParts = path.split("/");
  for (const [i, part] of pathParts.entries()) {
    const isLastPart = i === pathParts.length - 1;
    const found = allEntries.find((entry) => entry.name === part) || {};
    const id =
      found.id !== undefined ? util.types.toString(found.id) : undefined;
    const type =
      found.type !== undefined ? util.types.toString(found.type) : undefined;
    const name =
      found.name !== undefined ? util.types.toString(found.name) : undefined;
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
  return value
    .replace(/_/g, " ")
    .replace(/\./g, " ")
    .toLowerCase()
    .replace(/\b\w/g, (char) => char.toUpperCase());
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
  const { id: webhookId } = await client.webhooks.createWebhook({
    target: {
      id: targetId,
      type: targetType as CreateWebhookBody["target"]["type"],
    },
    address,
    triggers: triggerTypes as CreateWebhookBody["triggers"],
  });
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
const MAX_MESSAGE_AGE_SECONDS = 10 * 60;
const computeBoxSignature = (
  body: string,
  timestamp: string,
  key: string,
): string => {
  const hmac = createHmac("sha256", key);
  hmac.update(body);
  hmac.update(timestamp);
  return hmac.digest("base64");
};
const signatureMatches = (
  body: string,
  timestamp: string,
  key: string | undefined,
  received: string | undefined,
): boolean => {
  if (!key || !received) {
    return false;
  }
  const expected = Buffer.from(
    computeBoxSignature(body, timestamp, key),
    "base64",
  );
  const actual = Buffer.from(received, "base64");
  return expected.length === actual.length && timingSafeEqual(expected, actual);
};
export const validateBoxWebhookSignature = ({
  body,
  headers,
  primaryKey,
  secondaryKey,
}: {
  body: string;
  headers: Record<string, string | undefined>;
  primaryKey?: string;
  secondaryKey?: string;
}): boolean => {
  if (headers["box-signature-version"] !== "1") {
    return false;
  }
  if (headers["box-signature-algorithm"] !== "HmacSHA256") {
    return false;
  }
  const timestamp = headers["box-delivery-timestamp"];
  if (!timestamp) {
    return false;
  }
  const deliveredAt = Date.parse(timestamp);
  if (Number.isNaN(deliveredAt)) {
    return false;
  }
  if ((Date.now() - deliveredAt) / 1000 > MAX_MESSAGE_AGE_SECONDS) {
    return false;
  }
  return (
    signatureMatches(
      body,
      timestamp,
      primaryKey,
      headers["box-signature-primary"],
    ) ||
    signatureMatches(
      body,
      timestamp,
      secondaryKey,
      headers["box-signature-secondary"],
    )
  );
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
  T extends {
    created_at?: string;
    modified_at?: string;
  },
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
  T extends {
    created_at?: string;
    modified_at?: string;
  },
>(
  entries: T[],
  lastPolledAt: string,
) => {
  return entries.filter((entry) => entry.created_at > lastPolledAt);
};

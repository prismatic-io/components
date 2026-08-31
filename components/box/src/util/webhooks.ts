import { createHmac, timingSafeEqual } from "node:crypto";
import { type ActionLogger, util } from "@prismatic-io/spectral";
import type { BoxClient } from "box-node-sdk";
import {
  BOX_SIGNATURE_PRIMARY_HEADER,
  BOX_SIGNATURE_SECONDARY_HEADER,
  FILE_TYPE,
  FOLDER_TYPE,
  MAX_PAGE_SIZE,
} from "../constants";
import type {
  BoxRawEntry,
  BoxTargetType,
  CreateWebhookBody,
  StoreState,
  WebhookTriggerType,
} from "../types";
export const getAllWebhookEntries = async <T extends BoxRawEntry = BoxRawEntry>(
  client: BoxClient,
): Promise<{
  entries: T[];
}> => {
  let initial = true;
  let allEntries: T[] = [];
  let marker: string | undefined;
  while (initial || marker) {
    const response = await client.webhooks.getWebhooks({
      limit: MAX_PAGE_SIZE,
      marker,
    });
    initial = false;
    allEntries = allEntries.concat(
      (response.entries ?? []).map((entry) => entry.rawData as T),
    );
    marker = response.nextMarker;
  }
  return { entries: allEntries };
};
export const getInstanceWebhookIds = async (
  client: BoxClient,
  entries: BoxRawEntry[],
  webhookUrls: Record<string, string>,
): Promise<Set<string>> => {
  const detailed = await Promise.all(
    (entries || []).map((entry) =>
      client.webhooks.getWebhookById(util.types.toString(entry.id)),
    ),
  );
  const webhookDetails: {
    id: string;
    address: string;
  }[] = detailed.map((webhook) => ({
    id: util.types.toString(webhook.id),
    address: util.types.toString(webhook.address),
  }));
  const instanceWebhookUrls = new Set(Object.values(webhookUrls));
  return new Set(
    webhookDetails
      .filter(({ address }) => instanceWebhookUrls.has(address))
      .map(({ id }) => id),
  );
};
export const assertTargetType = (targetType: string): BoxTargetType => {
  if (![FILE_TYPE, FOLDER_TYPE].includes(targetType)) {
    throw new Error(`Invalid target type specified: ${targetType}`);
  }
  return targetType as BoxTargetType;
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
): Promise<{
  crossFlowState: Record<string, StoreState>;
  webhookId: string | undefined;
}> => {
  const validTargetType = assertTargetType(targetType);
  const { id: webhookId } = await client.webhooks.createWebhook({
    target: {
      id: targetId,
      type: validTargetType as CreateWebhookBody["target"]["type"],
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
        previousTargetId: targetId,
        previousTargetType: validTargetType,
        previousTriggerTypes: triggerTypes,
      },
    },
    webhookId,
  };
};
export const resolveStoreState = (
  crossFlowState: Record<string, unknown>,
  storeKey: string,
  legacyStoreKey: string,
): {
  state: StoreState | undefined;
  adoptedFromLegacyKey: boolean;
} => {
  const state = crossFlowState[storeKey] as StoreState | undefined;
  if (state?.existingWebhookId) {
    return { state, adoptedFromLegacyKey: false };
  }
  const legacyState = crossFlowState[legacyStoreKey] as StoreState | undefined;
  if (legacyState?.existingWebhookId) {
    return { state: legacyState, adoptedFromLegacyKey: true };
  }
  return { state, adoptedFromLegacyKey: false };
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
      headers[BOX_SIGNATURE_PRIMARY_HEADER],
    ) ||
    signatureMatches(
      body,
      timestamp,
      secondaryKey,
      headers[BOX_SIGNATURE_SECONDARY_HEADER],
    )
  );
};

import { action, input, util } from "@prismatic-io/spectral";
import { createAuthorizedClient } from "../client";
import {
  connectionInput,
  limit,
  marker,
  address,
  webhookId,
  targetId,
  targetType,
  triggerTypes,
  signatureKey,
  fetchAll,
} from "../inputs";
import { getAllWebhookEntries, type CreateWebhookBody } from "../utils";
import {
  listWebhooksExamplePayload,
  createWebhookExamplePayload,
  deleteWebhookExamplePayload,
  deleteInstanceWebhooksExamplePayload,
} from "../examplePayloads";
const getInstanceWebhookIds = async (
  client,
  entries,
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
export const listWebhooks = action({
  display: {
    label: "List Webhooks",
    description:
      "List all webhooks configured in Box, including those for other integrations",
  },
  inputs: {
    boxConnection: connectionInput,
    limit,
    marker,
    fetchAll,
    showOnlyInstanceWebhooks: input({
      label: "Show Only Instance Webhooks",
      comments: "Show only webhooks that point to this instance",
      type: "boolean",
      default: "true",
      clean: util.types.toBool,
    }),
  },
  perform: async (
    { webhookUrls },
    { boxConnection, limit, marker, showOnlyInstanceWebhooks, fetchAll },
  ) => {
    const client = createAuthorizedClient({ boxConnection });
    let entries: Record<string, unknown>[];
    let extra: Record<string, unknown> = {};
    if (fetchAll) {
      ({ entries } = await getAllWebhookEntries(client));
    } else {
      const options: {
        limit?: number;
        marker?: string;
      } = {};
      if (limit) options.limit = util.types.toInt(limit);
      if (marker) options.marker = util.types.toString(marker);
      const result = await client.webhooks.getWebhooks(options);
      entries = (result.entries ?? []).map(
        (entry) => entry.rawData as Record<string, unknown>,
      );
      extra = { limit: result.limit, next_marker: result.nextMarker };
    }
    if (showOnlyInstanceWebhooks) {
      const instanceWebhookIds = await getInstanceWebhookIds(
        client,
        entries,
        webhookUrls,
      );
      entries = entries.filter((entry) =>
        instanceWebhookIds.has(util.types.toString(entry.id)),
      );
    }
    return { data: { ...extra, entries } };
  },
  examplePayload: listWebhooksExamplePayload,
});
export const createWebhook = action({
  display: {
    label: "Create Webhook",
    description: "Create a webhook to send data from Box to an instance URL",
  },
  inputs: {
    address,
    targetId,
    targetType,
    triggerTypes,
    primarySignatureKey: { ...signatureKey, label: "Primary Signature Key" },
    secondarySignatureKey: {
      ...signatureKey,
      label: "Secondary Signature Key",
    },
    boxConnection: connectionInput,
  },
  perform: async (
    { logger, crossFlowState },
    {
      boxConnection,
      address,
      targetId,
      targetType,
      triggerTypes,
      primarySignatureKey,
      secondarySignatureKey,
    },
  ) => {
    const client = createAuthorizedClient({ boxConnection });
    let data = null;
    try {
      const created = await client.webhooks.createWebhook({
        target: {
          id: targetId,
          type: targetType as CreateWebhookBody["target"]["type"],
        },
        address,
        triggers: triggerTypes as CreateWebhookBody["triggers"],
      });
      data = created.rawData;
    } catch (error) {
      if ((error as Record<string, unknown>)?.statusCode === 409) {
        logger.warn(
          `Skipping creation of webhook. A webhook with this target (${targetId}), application, and user already exists.`,
        );
      } else {
        throw error;
      }
    }
    if (primarySignatureKey) {
      crossFlowState.primarySignatureKey = primarySignatureKey;
    }
    if (secondarySignatureKey) {
      crossFlowState.secondarySignatureKey = secondarySignatureKey;
    }
    return { data, crossFlowState };
  },
  examplePayload: createWebhookExamplePayload,
});
export const deleteWebhook = action({
  display: {
    label: "Delete Webhook",
    description: "Delete a webhook by ID",
  },
  inputs: {
    boxConnection: connectionInput,
    webhookId,
  },
  perform: async (context, { boxConnection, webhookId }) => {
    const client = createAuthorizedClient({ boxConnection });
    await client.webhooks.deleteWebhookById(util.types.toString(webhookId));
    return { data: null };
  },
  examplePayload: deleteWebhookExamplePayload,
});
export const deleteInstanceWebhooks = action({
  display: {
    label: "Delete Instance Webhooks",
    description:
      "Delete all Box webhooks that point to a flow in this instance",
  },
  inputs: { boxConnection: connectionInput },
  perform: async ({ logger, webhookUrls }, { boxConnection }) => {
    const client = createAuthorizedClient({ boxConnection });
    const entries: Record<string, unknown>[] = [];
    let stop = false;
    let marker: string | undefined;
    while (!stop) {
      const options = marker ? { marker } : {};
      const webhooks = await client.webhooks.getWebhooks(options);
      entries.push(
        ...(webhooks?.entries ?? []).map(
          (entry) => entry.rawData as Record<string, unknown>,
        ),
      );
      stop = !marker;
      marker = webhooks?.nextMarker;
    }
    const instanceWebhookIds = await getInstanceWebhookIds(
      client,
      entries,
      webhookUrls,
    );
    for (const webhookId of instanceWebhookIds) {
      logger.info(`Deleting webhook ${webhookId}...`);
      await client.webhooks.deleteWebhookById(util.types.toString(webhookId));
    }
    return { data: {} };
  },
  examplePayload: deleteInstanceWebhooksExamplePayload,
});
export default {
  createWebhook,
  deleteWebhook,
  listWebhooks,
  deleteInstanceWebhooks,
};

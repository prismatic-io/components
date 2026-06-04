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
import type { WebhookTriggerType } from "../interfaces";
import { getAllWebhookEntries } from "../utils";
import {
  listWebhooksExamplePayload,
  createWebhookExamplePayload,
  deleteWebhookExamplePayload,
} from "../examplePayloads";


const getInstanceWebhookIds = async (
  client,
  entries,
  webhookUrls: Record<string, string>,
): Promise<Set<string>> => {
  
  
  
  const webhookDetails: { id: string; address: string }[] = await Promise.all(
    (entries || []).map(({ id }) => client.webhooks.get(id)),
  );

  
  
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
    const options: Record<string, unknown> = {};
    if (limit && !fetchAll) {
      options.limit = limit;
    }
    if (marker && !fetchAll) {
      options.marker = marker;
    }
    const webhooks = fetchAll
      ? await getAllWebhookEntries(client)
      : await client.webhooks.getAll(options);

    if (showOnlyInstanceWebhooks) {
      const instanceWebhookIds = await getInstanceWebhookIds(
        client,
        webhooks?.entries,
        webhookUrls,
      );

      return {
        data: {
          ...webhooks,
          entries: (webhooks.entries || []).filter(({ id }) =>
            instanceWebhookIds.has(id),
          ),
        },
      };
    }

    return { data: webhooks };
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
      data = await client.webhooks.create(
        targetId,
        targetType,
        address,
        triggerTypes as WebhookTriggerType[],
      );
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
    await client.webhooks.delete(webhookId);
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

    
    const entries = [];
    let stop = false;
    let marker = null;
    while (!stop) {
      const options = marker ? { marker } : {};
      const webhooks = await client.webhooks.getAll(options);

      entries.push(...(webhooks?.entries || []));
      stop = !marker;
      marker = webhooks?.next_marker;
    }

    
    const instanceWebhookIds = await getInstanceWebhookIds(
      client,
      entries,
      webhookUrls,
    );
    for (const webhookId of instanceWebhookIds) {
      logger.info(`Deleting webhook ${webhookId}...`);
      await client.webhooks.delete(webhookId);
    }

    return { data: {} };
  },
});

export default {
  createWebhook,
  deleteWebhook,
  listWebhooks,
  deleteInstanceWebhooks,
};

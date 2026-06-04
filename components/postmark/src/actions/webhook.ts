import { action } from "@prismatic-io/spectral";
import {
  connectionInput,
  webhookUrl,
  triggers,
  webhookId,
  showOnlyInstanceWebhooks,
} from "../inputs";
import { createHttpClient } from "../client";
import {
  listWebhooksExamplePayload,
  getWebhookExamplePayload,
  createWebhookExamplePayload,
  editWebhookExamplePayload,
  deleteWebhookExamplePayload,
  deleteInstancedWebhooksExamplePayload,
} from "../examplePayloads";

export const listWebhooks = action({
  display: {
    label: "List Webhooks",
    description: "List all webhooks for a server",
  },
  examplePayload: listWebhooksExamplePayload,
  perform: async (context, params) => {
    const client = createHttpClient(
      params.postmarkConnection,
      context.debug.enabled,
    );
    const { data } = await client.get("/webhooks");

    return {
      data,
    };
  },
  inputs: {
    postmarkConnection: connectionInput,
    showOnlyInstanceWebhooks,
  },
});

export const getWebhook = action({
  display: {
    label: "Get Webhook",
    description: "Retrieve a specific webhook",
  },
  examplePayload: getWebhookExamplePayload,
  perform: async (context, params) => {
    const client = createHttpClient(
      params.postmarkConnection,
      context.debug.enabled,
    );

    const { data } = await client.get(`/webhooks/${params.webhookId}`);
    return {
      data,
    };
  },
  inputs: {
    postmarkConnection: connectionInput,
    webhookId,
  },
});

export const createWebhook = action({
  display: {
    label: "Create Webhook",
    description: "Create a new webhook",
  },
  examplePayload: createWebhookExamplePayload,
  perform: async (context, params) => {
    const webhookConfig = {
      Url: params.webhookUrl,
      Triggers: params.triggers,
    };

    const client = createHttpClient(
      params.postmarkConnection,
      context.debug.enabled,
    );
    const { data } = await client.post(`/webhooks`, webhookConfig);
    return {
      data,
    };
  },
  inputs: {
    postmarkConnection: connectionInput,
    webhookUrl,
    triggers,
  },
});

export const editWebhook = action({
  display: {
    label: "Edit Webhook",
    description: "Edit an existing webhook",
  },
  examplePayload: editWebhookExamplePayload,
  perform: async (context, params) => {
    const webhookConfig = {
      Url: params.webhookUrl,
      Triggers: params.triggers,
      
    };

    const client = createHttpClient(
      params.postmarkConnection,
      context.debug.enabled,
    );
    const { data } = await client.put(
      `/webhooks/${params.webhookId}`,
      webhookConfig,
    );
    return {
      data,
    };
  },
  inputs: {
    postmarkConnection: connectionInput,
    webhookId,
    webhookUrl,
    triggers,
  },
});

export const deleteWebhook = action({
  display: {
    label: "Delete Webhook",
    description: "Delete a specific webhook",
  },
  examplePayload: deleteWebhookExamplePayload,
  perform: async (context, params) => {
    const client = createHttpClient(
      params.postmarkConnection,
      context.debug.enabled,
    );
    const { data } = await client.delete(`/webhooks/${params.webhookId}`);
    return {
      data,
    };
  },
  inputs: {
    postmarkConnection: connectionInput,
    webhookId,
  },
});

export const deleteInstancedWebhooks = action({
  display: {
    label: "Delete Instanced Webhooks",
    description: "Delete all webhooks that point to this instance",
  },
  examplePayload: deleteInstancedWebhooksExamplePayload,
  perform: async (context, params) => {
    const allWebhooks = await listWebhooks.perform(context, {
      postmarkConnection: params.postmarkConnection,
      showOnlyInstanceWebhooks: "true",
    });

    for (const webhook of allWebhooks.data.Webhooks) {
      await deleteWebhook.perform(context, {
        postmarkConnection: params.postmarkConnection,
        webhookId: webhook.ID,
      });
    }

    return {
      data: { message: "All listed webhooks deleted successfully." },
    };
  },
  inputs: {
    postmarkConnection: connectionInput,
  },
});

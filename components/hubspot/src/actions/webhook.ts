import { action } from "@prismatic-io/spectral";
import { getHubspotClient } from "../client";
import { SUCCESS_MESSAGE } from "../constants";
import {
  createWebhookPayload,
  deleteAllWebhooksPayload,
  deleteWebhookPayload,
  listWebhooksPayload,
} from "../examplePayloads";
import {
  active,
  connectionInput,
  eventType,
  propertyWebhookName,
  subscriptionId,
  timeout,
} from "../inputs";
import { checkDeveloperApiKeyAndAppId, deleteAllAppSubscriptions } from "../util";

export const listWebhooks = action({
  display: {
    label: "List Webhooks",
    description: "Retrieve a list of all webhook subscriptions for the HubSpot app.",
  },
  perform: async (context, { hubspotConnection, timeout }) => {
    const debugRequest = context.debug.enabled;
    const client = getHubspotClient(
      {
        hubspotConnection,
        timeout,
        debugRequest,
      },
      false,
    );
    const { developerApiKey, appId } = checkDeveloperApiKeyAndAppId(hubspotConnection);
    
    const { data } = await client.get(`/webhooks/v3/${appId}/subscriptions`, {
      params: { hapikey: developerApiKey },
    });

    return { data };
  },
  inputs: {
    hubspotConnection: connectionInput,
    timeout,
  },
  examplePayload: listWebhooksPayload,
});

export const createWebhook = action({
  display: {
    label: "Create Webhook",
    description: "Create a webhook in HubSpot",
  },
  perform: async (
    context,
    { hubspotConnection, eventType, propertyWebhookName, active, timeout },
  ) => {
    const debugRequest = context.debug.enabled;
    const client = getHubspotClient(
      {
        hubspotConnection,
        timeout,
        debugRequest,
        headers: { "Content-Type": "application/json" },
      },
      false,
    );
    const { developerApiKey, appId } = checkDeveloperApiKeyAndAppId(hubspotConnection);

    const { data } = await client.post(
      `/webhooks/v3/${appId}/subscriptions`,
      {
        eventType,
        ...(propertyWebhookName && { propertyName: propertyWebhookName }),
        active,
      },
      {
        params: { hapikey: developerApiKey },
      },
    );

    return { data };
  },
  inputs: {
    hubspotConnection: connectionInput,
    eventType,
    propertyWebhookName,
    active,
    timeout,
  },
  examplePayload: createWebhookPayload,
});

export const deleteWebhook = action({
  display: {
    label: "Delete Webhook",
    description: "Delete a webhook by ID in HubSpot",
  },
  perform: async (context, { hubspotConnection, subscriptionId, timeout }) => {
    const debugRequest = context.debug.enabled;
    const client = getHubspotClient(
      {
        hubspotConnection,
        timeout,
        debugRequest,
      },
      false,
    );
    const { developerApiKey, appId } = checkDeveloperApiKeyAndAppId(hubspotConnection);

    const { data } = await client.delete(`/webhooks/v3/${appId}/subscriptions/${subscriptionId}`, {
      params: { hapikey: developerApiKey },
    });

    return { data };
  },
  inputs: {
    hubspotConnection: connectionInput,
    subscriptionId,
    timeout,
  },
  examplePayload: deleteWebhookPayload,
});

export const deleteAllWebhooks = action({
  display: {
    label: "Delete All Instanced Webhooks",
    description: "Delete all webhooks created by this instance in HubSpot",
  },
  perform: async (context, { hubspotConnection, timeout }) => {
    const debugRequest = context.debug.enabled;
    const client = getHubspotClient(
      {
        hubspotConnection,
        timeout,
        debugRequest,
      },
      false,
    );

    const { developerApiKey, appId } = checkDeveloperApiKeyAndAppId(hubspotConnection);

    await deleteAllAppSubscriptions(client, appId, developerApiKey);

    return {
      data: {
        message: SUCCESS_MESSAGE,
      },
    };
  },
  inputs: {
    hubspotConnection: connectionInput,
    timeout,
  },
  examplePayload: deleteAllWebhooksPayload,
});

export default {
  listWebhooks,
  createWebhook,
  deleteWebhook,
  deleteAllWebhooks,
};

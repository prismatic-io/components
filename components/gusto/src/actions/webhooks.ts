import { action } from "@prismatic-io/spectral";
import {
  connectionInput,
  eventTypeInput,
  fetchAll,
  limitInput,
  resourceUuidInput,
  sortOrderInput,
  startingAfterUuidInput,
  subscriptionTypesInput,
  webhookSubscriptionUuidInput,
  webhookUrlInput,
} from "../inputs";
import { createWebhookClient } from "../client";
import { fetchAllCursorEvents } from "../util";
import {
  listWebhookSubscriptionsExamplePayload,
  getWebhookSubscriptionExamplePayload,
  createWebhookSubscriptionExamplePayload,
  updateWebhookSubscriptionExamplePayload,
  deleteWebhookSubscriptionExamplePayload,
  getWebhookEventsExamplePayload,
} from "../examplePayloads";

const listWebhookSubscriptions = action({
  display: {
    label: "List Webhook Subscriptions",
    description:
      "Returns all webhook subscriptions associated with the provided Partner API token for Gusto.",
  },
  inputs: {
    connection: connectionInput,
  },
  perform: async (context, params) => {
    const client = await createWebhookClient(
      params.connection,
      context.debug.enabled,
    );
    const { data, headers } = await client.get(`/webhook_subscriptions`);
    return { data: { data, headers } };
  },
  examplePayload: listWebhookSubscriptionsExamplePayload,
});

const getWebhookSubscription = action({
  display: {
    label: "Get Webhook Subscription",
    description:
      "Returns the Webhook Subscription associated with the provided UUID for Gusto.",
  },
  inputs: {
    connection: connectionInput,
    webhookSubscriptionUuid: webhookSubscriptionUuidInput,
  },
  perform: async (context, params) => {
    const client = await createWebhookClient(
      params.connection,
      context.debug.enabled,
    );
    const endpoint = `/webhook_subscriptions/${params.webhookSubscriptionUuid}`;

    const { data, headers } = await client.get(endpoint);
    return { data: { data, headers } };
  },
  examplePayload: getWebhookSubscriptionExamplePayload,
});

const createWebhookSubscription = action({
  display: {
    label: "Create Webhook Subscription",
    description:
      "Creates a Webhook Subscription to receive notifications when entities change for Gusto.",
  },
  inputs: {
    connection: connectionInput,
    webhookUrl: webhookUrlInput,
    subscriptionTypes: subscriptionTypesInput,
  },
  perform: async (context, params) => {
    const client = await createWebhookClient(
      params.connection,
      context.debug.enabled,
    );

    const cleanedSubscriptionTypes = params.subscriptionTypes
      .split(",")
      .map((str) => str.trim());

    const body = {
      url: params.webhookUrl,
      subscription_types: cleanedSubscriptionTypes,
    };

    const { data, headers } = await client.post(`/webhook_subscriptions`, body);
    return { data: { data, headers } };
  },
  examplePayload: createWebhookSubscriptionExamplePayload,
});

const updateWebhookSubscription = action({
  display: {
    label: "Update Webhook Subscription",
    description:
      "Updates the Webhook Subscription associated with the provided UUID for Gusto.",
  },
  inputs: {
    connection: connectionInput,
    webhookSubscriptionUuid: webhookSubscriptionUuidInput,
    subscriptionTypes: subscriptionTypesInput,
  },
  perform: async (context, params) => {
    const client = await createWebhookClient(
      params.connection,
      context.debug.enabled,
    );

    const cleanedSubscriptionTypes = params.subscriptionTypes
      .split(",")
      .map((str) => str.trim());

    const body = {
      subscription_types: cleanedSubscriptionTypes,
    };

    const { data, headers } = await client.put(
      `/webhook_subscriptions/${params.webhookSubscriptionUuid}`,
      body,
    );
    return { data: { data, headers } };
  },
  examplePayload: updateWebhookSubscriptionExamplePayload,
});

const deleteWebhookSubscription = action({
  display: {
    label: "Delete Webhook Subscription",
    description:
      "Deletes the Webhook Subscription associated with the provided UUID for Gusto.",
  },
  inputs: {
    connection: connectionInput,
    webhookSubscriptionUuid: webhookSubscriptionUuidInput,
  },
  perform: async (context, params) => {
    const client = await createWebhookClient(
      params.connection,
      context.debug.enabled,
    );

    await client.delete(
      `/webhook_subscriptions/${params.webhookSubscriptionUuid}`,
    );
    return { data: { message: "The resource was deleted successfully." } };
  },
  examplePayload: deleteWebhookSubscriptionExamplePayload,
});

const getWebhookEvents = action({
  display: {
    label: "Get Webhook Events",
    description:
      "Get webhook events based on the partner application's scopes for Gusto.",
  },
  inputs: {
    connection: connectionInput,
    resourceUuid: resourceUuidInput,
    eventType: eventTypeInput,
    sortOrder: sortOrderInput,
    fetchAll,
    startingAfterUuid: startingAfterUuidInput,
    limit: limitInput,
  },
  perform: async (context, params) => {
    const client = await createWebhookClient(
      params.connection,
      context.debug.enabled,
    );

    if (params.fetchAll) {
      const data = await fetchAllCursorEvents(client, "/events", {
        resource_uuid: params.resourceUuid,
        event_type: params.eventType,
        sort_order: params.sortOrder,
      });
      return { data: { data, headers: {} } };
    }

    const queryParams = {
      resource_uuid: params.resourceUuid,
      event_type: params.eventType,
      starting_after_uuid: params.startingAfterUuid,
      limit: params.limit,
      sort_order: params.sortOrder,
    };

    const { data, headers } = await client.get(`/events`, {
      params: queryParams,
    });
    return { data: { data, headers } };
  },
  examplePayload: getWebhookEventsExamplePayload,
});
export default {
  listWebhookSubscriptions,
  getWebhookSubscription,
  createWebhookSubscription,
  updateWebhookSubscription,
  deleteWebhookSubscription,
  getWebhookEvents,
};

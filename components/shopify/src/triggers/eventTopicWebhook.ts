import { trigger } from "@prismatic-io/spectral";
import { getShopifyGraphQlClient } from "../client";
import { MAX_LIMIT } from "../constants";

import { eventTopicWebhookInputs as inputs } from "../inputsGql";
import { createWebhook, deleteWebhookById, listWebhooks, performFunction } from "../util";

export const eventTopicWebhookGql = trigger({
  display: {
    label: "Event Topic Subscription",
    description:
      "Receive event notifications from Shopify. Automatically creates and manages a webhook subscription for selected event topics when the instance is deployed, and removes the subscription when the instance is deleted.",
  },
  inputs,
  synchronousResponseSupport: "invalid",
  scheduleSupport: "invalid",
  perform: performFunction,
  webhookLifecycleHandlers: {
    create: async (context, { shopifyConnection, webhookTopics }) => {
      const endpoint = context.webhookUrls[context.flow.name];

      const client = getShopifyGraphQlClient(shopifyConnection, undefined, false);

      const promises = webhookTopics.map((webhookTopic) =>
        createWebhook(client, {
          topic: webhookTopic,
          webhookSubscription: {
            callbackUrl: endpoint,
            format: "JSON",
          },
        }),
      );

      await Promise.all(promises);
    },
    delete: async (context, { shopifyConnection }) => {
      const endpoint = context.webhookUrls[context.flow.name];
      const client = getShopifyGraphQlClient(shopifyConnection, undefined, false);

      const { webhookSubscriptions } = await listWebhooks(
        client,
        true,
        MAX_LIMIT,
        false,
        [],
        undefined,
        endpoint,
      );
      const promises = webhookSubscriptions.map((webhook) => deleteWebhookById(client, webhook.id));
      await Promise.all(promises);
    },
  },
});

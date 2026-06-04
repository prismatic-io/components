import * as crypto from "node:crypto";
import { type TriggerPayload, trigger, util } from "@prismatic-io/spectral";
import { getShopifyClient } from "../client";
import { eventTopicWebhookInputs, webhookInputs } from "../inputs";
import { createWebhooks, deleteWebhooksInstance, performFunction } from "../util";

export const eventTopicWebhook = trigger({
  display: {
    label: "Event Topic Webhook (Deprecated)",
    description:
      "Set event based webhooks and get notified when these event types are created, updated, or deleted. This version of the trigger is being deprecated. Please replace trigger with Event Topic Webhook.",
  },
  inputs: eventTopicWebhookInputs,
  synchronousResponseSupport: "invalid",
  scheduleSupport: "invalid",
  perform: performFunction,
  onInstanceDeploy: async (context, { connectionInput, webhookTopic }) => {
    const endpoint = context.webhookUrls[context.flow.name];
    const client = getShopifyClient(connectionInput);
    await createWebhooks(client, webhookTopic, endpoint);
  },
  onInstanceDelete: async (context, { connectionInput }) => {
    const endpoint = context.webhookUrls[context.flow.name];
    const client = getShopifyClient(connectionInput);
    await deleteWebhooksInstance(client, endpoint);
  },
});

export const webhook = trigger({
  display: {
    label: "Webhook",
    description:
      "Receive and validate webhook requests from Shopify for manually configured webhook subscriptions.",
  },
  perform: async (context, payload: TriggerPayload, { secret_key }) => {
    if (secret_key) {
      const headers = util.types.lowerCaseHeaders(payload.headers);
      const SHOPIFY_HMAC = headers["x-shopify-hmac-sha256"];
      if (SHOPIFY_HMAC) {
        const requestBody = util.types.toString(payload.rawBody.data);
        if (!context.isSimulatedTestExecution) {
          const signature = crypto
            .createHmac("sha256", secret_key)
            .update(requestBody, "utf8")
            .digest("base64");
          const match = signature === SHOPIFY_HMAC;
          if (!match) {
            throw new Error("Signature verification failed");
          }
        }
        return Promise.resolve({
          payload,
          response: {
            headers: {
              ...headers,
              "X-Shopify-Hmac-SHA256": SHOPIFY_HMAC,
            },
            statusCode: 200,
            contentType: "application/json",
            body: JSON.parse(util.types.toString(requestBody)),
          },
        });
      }
    }
    if (!context.isSimulatedTestExecution) {
      throw new Error("Signature verification failed");
    }
    return Promise.resolve({
      payload,
      response: {
        statusCode: 200,
        contentType: "application/json",
        body: "{}",
      },
    });
  },
  inputs: webhookInputs,
  synchronousResponseSupport: "invalid",
  scheduleSupport: "invalid",
});

export default { webhook, eventTopicWebhook };

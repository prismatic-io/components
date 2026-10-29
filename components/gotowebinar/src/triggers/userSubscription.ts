import { trigger } from "@prismatic-io/spectral";
import { createGotoWebinarClient } from "../client";
import { userSubscriptionTriggerExamplePayload } from "../examplePayloads";
import { connection, eventName, eventVersion } from "../inputs";
import type { GoToWebinarResponse, Webhook } from "../types";
import { deleteInstancedWebhooks } from "../util";

export const userSubscriptionTrigger = trigger({
  display: {
    label: "User Subscription",
    description:
      "Receive event notifications from GoTo Webinar. Automatically creates and manages a webhook subscription for the selected event when the instance is deployed, and removes the subscription when the instance is deleted.",
  },
  inputs: { connection, eventName, eventVersion },
  examplePayload: userSubscriptionTriggerExamplePayload,
  webhookLifecycleHandlers: {
    create: async (context, { connection, eventName, eventVersion }) => {
      const { client } = createGotoWebinarClient(connection, false);
      const flowName = context.flow.name;
      const callbackUrl = context.webhookUrls[flowName];

      const payload = [
        {
          eventVersion,
          eventName,
          callbackUrl,
          product: "g2w",
        },
      ];

      const {
        data: {
          _embedded: { webhooks },
        },
      } = await client.post<GoToWebinarResponse<Webhook>>("/webhooks", payload);

      const { webhookKey } = webhooks[0];
      await client.post("/userSubscriptions", [
        {
          callbackUrl,
          webhookKey,
          userSubscriptionState: "ACTIVE",
        },
      ]);
    },
    delete: async (context, { connection }) => {
      const { client } = createGotoWebinarClient(connection, false);
      await deleteInstancedWebhooks(
        client,
        Object.values(context.webhookUrls),
        {
          product: "g2w",
        },
      );
    },
  },
  perform: async (context, payload) => {
    return Promise.resolve({
      payload,
      response: {
        statusCode: 200,
        contentType: "application/json",
      },
    });
  },
  synchronousResponseSupport: "invalid",
  allowsBranching: false,
  scheduleSupport: "invalid",
});

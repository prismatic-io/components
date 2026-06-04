import { trigger } from "@prismatic-io/spectral";
import { connection } from "../inputs/general";
import { createGotoWebinarClient } from "../client";
import {
  eventName,
  eventVersion,
} from "../inputs/subscriptions/createUserSubscriptionInputs";
import { GoToWebinarResponse, Webhook } from "../interfaces";
import { deleteInstancedWebhooks } from "../utils";

export const userSubscriptionTrigger = trigger({
  display: {
    label: "User Subscription",
    description: "Triggers when a user subscribes to a plan",
  },
  inputs: { connection, eventName, eventVersion },
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

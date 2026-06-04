import { trigger } from "@prismatic-io/spectral";
import { createClient } from "../client";
import {
  MAX_MINUTES_EXPIRATION_USERS_GROUPS_SUBSCRIPTION,
  SubscriptionResources,
  TriggerBranches,
} from "../constants";
import { userTriggerInputs as inputs } from "../inputs/triggers";
import {
  addMinutesToDate,
  removeSubscriptions,
  subscribeToResource,
  triggerPerformFunction,
} from "../util";

export const userTrigger = trigger({
  display: {
    label: "User Changes",
    description:
      "Receive user change notifications from Microsoft Entra ID. Automatically creates and manages a webhook subscription for users when the instance is deployed, and removes the subscription when the instance is deleted.",
  },
  scheduleSupport: "invalid",
  synchronousResponseSupport: "invalid",
  allowsBranching: true,
  inputs,
  staticBranchNames: [
    TriggerBranches.Notification,
    TriggerBranches.URLValidation,
  ],
  perform: triggerPerformFunction,
  webhookLifecycleHandlers: {
    create: async (
      context,
      { connection, changeType, expirationTriggerDateTime },
    ) => {
      const endpoint = context.webhookUrls[context.flow.name];
      const client = createClient(connection, true);

      const expirationDateTime = expirationTriggerDateTime
        ? expirationTriggerDateTime
        : addMinutesToDate(
            new Date(),
            MAX_MINUTES_EXPIRATION_USERS_GROUPS_SUBSCRIPTION,
          );

      await subscribeToResource(
        client,
        endpoint,
        SubscriptionResources.Users,
        changeType,
        expirationDateTime,
      );
    },
    delete: async (context, { connection }) => {
      const client = createClient(connection, true);
      const endpoint = context.webhookUrls[context.flow.name];

      await removeSubscriptions(client, new Set([endpoint]));
    },
  },
});

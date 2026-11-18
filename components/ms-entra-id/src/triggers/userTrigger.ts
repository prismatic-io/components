import { trigger } from "@prismatic-io/spectral";
import {
  deleteSubscriptionTrigger,
  replaceSubscriptionOnDeploy,
} from "ms-utils";
import { createClient } from "../client";
import {
  MAX_MINUTES_EXPIRATION_USERS_GROUPS_SUBSCRIPTION,
  SubscriptionResources,
  TriggerBranches,
} from "../constants";
import { userTriggerExamplePayload } from "../examplePayloads";
import { userTriggerInputs as inputs } from "../inputs/triggers";
import { addMinutesToDate, triggerPerformFunction } from "../util";

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
  examplePayload: userTriggerExamplePayload,
  webhookLifecycleHandlers: {
    create: async (
      context,
      { connection, changeType, expirationTriggerDateTime },
    ) => {
      const client = createClient(connection, context.debug.enabled);

      const expirationDateTime = expirationTriggerDateTime
        ? expirationTriggerDateTime
        : addMinutesToDate(
            new Date(),
            MAX_MINUTES_EXPIRATION_USERS_GROUPS_SUBSCRIPTION,
          );

      const { crossFlowState } = await replaceSubscriptionOnDeploy(
        client,
        {
          resource: SubscriptionResources.Users,
          changeType,
          expirationDateTime,
        },
        context,
      );
      return { crossFlowState };
    },
    delete: async (context, { connection }) => {
      const client = createClient(connection, context.debug.enabled);

      await deleteSubscriptionTrigger(client, context);
    },
  },
});

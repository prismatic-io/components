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
import { groupTriggerExamplePayload } from "../examplePayloads";
import { groupTriggerInputs as inputs } from "../inputs/triggers";
import { addMinutesToDate, triggerPerformFunction } from "../util";

export const groupTrigger = trigger({
  display: {
    label: "Group Changes",
    description:
      "Receive group change notifications from Microsoft Entra ID. Automatically creates and manages a webhook subscription for groups when the instance is deployed, and removes the subscription when the instance is deleted.",
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
  examplePayload: groupTriggerExamplePayload,
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
          resource: SubscriptionResources.Groups,
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

import { trigger } from "@prismatic-io/spectral";
import { createClient } from "../client";
import { TriggerBranches } from "../constants";
import { resourceTriggerInputs } from "../inputs";
import {
  getExpirationDate,
  removeSubscriptions,
  subscribeToResource,
  triggerPerformFunction,
} from "../util";
export const resourceTrigger = trigger({
  display: {
    label: "Resource Change",
    description:
      "Receive resource change notifications from Microsoft Intune. Handles URL validation challenges automatically and manages webhook subscriptions on deploy and deletion.",
  },
  scheduleSupport: "invalid",
  synchronousResponseSupport: "invalid",
  allowsBranching: true,
  inputs: resourceTriggerInputs,
  staticBranchNames: [
    TriggerBranches.Notification,
    TriggerBranches.URLValidation,
  ],
  perform: triggerPerformFunction,
  webhookLifecycleHandlers: {
    create: async (
      context,
      { connection, changeType, expirationDateTime, resource },
    ) => {
      const endpoint = context.webhookUrls[context.flow.name];
      const client = createClient(connection, true);
      const currentExpirationDateTime = getExpirationDate(expirationDateTime);
      await subscribeToResource(
        client,
        endpoint,
        resource,
        changeType,
        currentExpirationDateTime,
      );
    },
    delete: async (context, { connection }) => {
      const client = createClient(connection, true);
      const endpoint = context.webhookUrls[context.flow.name];
      await removeSubscriptions(client, new Set([endpoint]));
    },
  },
});

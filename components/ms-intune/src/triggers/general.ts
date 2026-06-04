import { trigger } from "@prismatic-io/spectral";
import { TriggerBranches } from "../constants";
import {
  getExpirationDate,
  removeSubscriptions,
  subscribeToResource,
  triggerPerformFunction,
} from "../util";
import { triggerSubscriptionInputs } from "../inputs/subscriptions/general";
import { connection } from "../inputs/general";
import { createClient } from "../client";

export const resourceTrigger = trigger({
  display: {
    label: "Resource Trigger",
    description:
      "Get notified to this flow when the specified resource changes.",
  },
  scheduleSupport: "invalid",
  synchronousResponseSupport: "invalid",
  allowsBranching: true,
  inputs: {
    ...triggerSubscriptionInputs,
    connection,
  },
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

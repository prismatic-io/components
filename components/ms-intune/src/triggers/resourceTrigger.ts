import { trigger } from "@prismatic-io/spectral";
import {
  deleteSubscriptionTrigger,
  replaceSubscriptionOnDeploy,
} from "ms-utils";
import { createClient } from "../client";
import { MISSING_CHANGE_TYPE_MESSAGE, TriggerBranches } from "../constants";
import { resourceTriggerExamplePayload } from "../examplePayloads";
import { resourceTriggerInputs } from "../inputs";
import { getExpirationDate, triggerPerformFunction } from "../util";

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
  examplePayload: resourceTriggerExamplePayload,
  webhookLifecycleHandlers: {
    create: async (
      context,
      { connection, changeType, expirationDateTime, resource },
    ) => {
      if (!changeType?.length) {
        throw new Error(MISSING_CHANGE_TYPE_MESSAGE);
      }
      const client = createClient(connection, context.debug.enabled);

      const { crossFlowState } = await replaceSubscriptionOnDeploy(
        client,
        {
          resource,
          changeType: changeType.join(","),
          expirationDateTime: getExpirationDate(expirationDateTime),
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

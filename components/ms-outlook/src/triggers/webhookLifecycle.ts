import { trigger } from "@prismatic-io/spectral";
import { createSubscriptionTrigger, deleteSubscriptionTrigger, getBase64FromUrl } from "ms-utils";
import { createClient } from "../client";
import { webhookLifecycleTriggerExamplePayload } from "../examplePayloads";
import { createWebhookSubscriptionInputs } from "../inputs";
import { createWebhookPerformFN } from "../util";

export const webhookLifecycle = trigger({
  display: {
    label: "Calendar Event Webhook",
    description:
      "Receive calendar event notifications from Outlook. Automatically creates and manages a webhook subscription for calendar events when the instance is deployed, and removes the subscription when the instance is deleted. Supports scheduled renewal to keep the subscription active.",
  },
  scheduleSupport: "valid",
  synchronousResponseSupport: "invalid",
  allowsBranching: true,
  inputs: createWebhookSubscriptionInputs,
  staticBranchNames: ["Notification", "URL Validation", "Scheduled Renewal"],
  perform: createWebhookPerformFN("event"),
  examplePayload: webhookLifecycleTriggerExamplePayload,
  webhookLifecycleHandlers: {
    create: async (context, { allowDuplicates, connection, expirationDateTime }) => {
      const client = createClient(connection, context.debug.enabled);
      const flowKey = getBase64FromUrl(context.webhookUrls[context.flow.name]);
      const subscription = await createSubscriptionTrigger(
        client,
        {
          resource: "me/events",
          changeType: "updated",
          expirationDateTime,
          allowDuplicates,
        },
        context,
      );

      if (subscription?.id) {
        context.logger.info(`Storing subscription ID ${subscription.id} for scheduled renewals`);
        context.crossFlowState[flowKey] = subscription.id;
      }

      context.logger.info(
        `Created webhook subscription for flow ${context.flow.name} (${context.flow.id})`,
      );
    },
    delete: async (context, params) => {
      const client = createClient(params.connection, context.debug.enabled);
      const flowKey = getBase64FromUrl(context.webhookUrls[context.flow.name]);
      await deleteSubscriptionTrigger(client, context);
      context.crossFlowState[flowKey] = undefined;
      context.logger.info(
        `Deleted webhook subscription for flow ${context.flow.name} (${context.flow.id})`,
      );
    },
  },
});

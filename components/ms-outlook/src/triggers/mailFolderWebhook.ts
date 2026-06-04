import { trigger } from "@prismatic-io/spectral";
import { createSubscriptionTrigger, deleteSubscriptionTrigger, getBase64FromUrl } from "ms-utils";
import { createClient } from "../client";
import { mailFolderWebhookTriggerExamplePayload } from "../examplePayloads";
import { createMailFolderWebhookInputs } from "../inputs";
import { createWebhookPerformFN } from "../util";

export const mailFolderWebhook = trigger({
  display: {
    label: "Mail Message Webhook",
    description:
      "Receive mail message notifications from Outlook. Automatically creates and manages a webhook subscription for mail messages when the instance is deployed, and removes the subscription when the instance is deleted. Supports scheduled renewal to keep the subscription active.",
  },
  scheduleSupport: "valid",
  synchronousResponseSupport: "invalid",
  allowsBranching: true,
  inputs: createMailFolderWebhookInputs,
  staticBranchNames: ["Notification", "URL Validation", "Scheduled Renewal"],
  perform: createWebhookPerformFN("message"),
  examplePayload: mailFolderWebhookTriggerExamplePayload,
  webhookLifecycleHandlers: {
    create: async (
      context,
      { allowDuplicates, connection, expirationDateTime, folderId, changeTypes },
    ) => {
      const client = createClient(connection, context.debug.enabled);
      const resource = folderId ? `me/mailFolders/${folderId}/messages` : "me/messages";
      const flowKey = getBase64FromUrl(context.webhookUrls[context.flow.name]);
      const subscription = await createSubscriptionTrigger(
        client,
        {
          resource,
          changeType: changeTypes,
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
        `Created mail webhook subscription for flow ${context.flow.name} (${context.flow.id})`,
      );
    },
    delete: async (context, params) => {
      const client = createClient(params.connection, context.debug.enabled);
      const flowKey = getBase64FromUrl(context.webhookUrls[context.flow.name]);
      await deleteSubscriptionTrigger(client, context);
      context.crossFlowState[flowKey] = undefined;
      context.logger.info(
        `Deleted mail webhook subscription for flow ${context.flow.name} (${context.flow.id})`,
      );
    },
  },
});

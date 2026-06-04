import { trigger } from "@prismatic-io/spectral";
import { webhookTriggerInputs } from "../inputs";
import { webhookTriggerExamplePayload } from "../examplePayloads";
import {
  createWebhook,
  deleteWebhookByUrl,
  findWebhookByUrl,
} from "../utils/webhooks";

export const listEventsWebhook = trigger({
  display: {
    label: "List Events Webhook",
    description:
      "Receive list event notifications from Mailchimp. Automatically creates and manages a webhook subscription for selected event types when the instance is deployed, and removes the subscription when the instance is deleted.",
  },
  allowsBranching: false,
  inputs: webhookTriggerInputs,
  synchronousResponseSupport: "invalid",
  scheduleSupport: "invalid",
  perform: async (_context, payload, _inputs) => {
    return Promise.resolve({ payload });
  },
  examplePayload: webhookTriggerExamplePayload,
  webhookLifecycleHandlers: {
    create: async (
      context,
      { connection, listId, webhookEvents, webhookSources },
    ) => {
      const webhookUrl = context.webhookUrls[context.flow.name];

      
      const existingWebhook = await findWebhookByUrl(
        connection,
        listId,
        webhookUrl,
      );

      if (existingWebhook) {
        context.logger.info(
          `Webhook already exists for list ${listId}, skipping creation.`,
        );
        return;
      }

      context.logger.info(`Creating webhook subscription for list ${listId}.`);

      await createWebhook(
        connection,
        listId,
        webhookUrl,
        webhookEvents,
        webhookSources,
      );
    },
    delete: async (context, { connection, listId }) => {
      const webhookUrl = context.webhookUrls[context.flow.name];

      
      const existingWebhook = await findWebhookByUrl(
        connection,
        listId,
        webhookUrl,
      );

      if (!existingWebhook) {
        context.logger.info(
          `No webhook found for list ${listId} with matching URL, skipping deletion.`,
        );
        return;
      }

      context.logger.info(`Deleting webhook subscription for list ${listId}.`);
      await deleteWebhookByUrl(connection, listId, webhookUrl);
    },
  },
});

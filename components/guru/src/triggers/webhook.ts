import { trigger } from "@prismatic-io/spectral";
import { webhookInputs } from "../inputs";
import { listWebhookSubscriptions } from "../actions/webhooks/listWebhookSubscriptions";
import { updateWebhookSubscription } from "../actions/webhooks/updateWebhookSubscription";
import { createWebhookSubscription } from "../actions/webhooks/createWebhookSubscription";
import { deleteWebhookSubscription } from "../actions/webhooks/deleteWebhookSubscription";

export const webhook = trigger({
  display: {
    label: "Webhook Events",
    description:
      "Manages Guru webhook subscriptions for your instance. On instance deploy, this trigger creates a webhook subscription in Guru (or reuses an existing one with matching URL and events). On instance deletion, it removes the subscription. The trigger validates incoming webhook requests and handles all webhook lifecycle management automatically.",
  },
  perform: async (_context, payload) => {
    return Promise.resolve({
      payload,
    });
  },
  inputs: webhookInputs,
  synchronousResponseSupport: "invalid",
  scheduleSupport: "invalid",
  webhookLifecycleHandlers: {
    create: async (
      context,
      { connection, webhookEventTypes, webhookActive, deliveryMode },
    ) => {
      const targetUrl = context.webhookUrls[context.flow.name];

      const { data } = await listWebhookSubscriptions.perform(context, {
        connection,
      });

      const existingWebhooks = data || [];

      const existingWebhook = existingWebhooks.find(
        (webhook) => webhook.targetUrl === targetUrl,
      );

      if (existingWebhook) {
        context.logger.info(
          `Reusing and updating existing webhook subscription with ID: ${existingWebhook.id}`,
        );
        try {
          const { data } = await updateWebhookSubscription.perform(context, {
            connection,
            webhookId: existingWebhook.id,
            targetUrl,
            webhookEventTypes,
            webhookActive,
            deliveryMode,
          });
          context.logger.info(
            `Updated webhook subscription with ID: ${data.id}`,
          );
        } catch (error) {
          context.logger.error(
            `Failed to update webhook subscription: ${(error as any).message}`,
          );
          throw error;
        }
      } else {
        context.logger.info(
          `Creating new webhook subscription for ${targetUrl}`,
        );
        try {
          const { data } = await createWebhookSubscription.perform(context, {
            connection,
            targetUrl,
            webhookEventTypes,
            webhookActive,
            deliveryMode,
          });
          context.logger.info(
            `Created webhook subscription with ID: ${data.id}`,
          );
        } catch (error) {
          context.logger.error(
            `Failed to create webhook subscription: ${(error as any).message}`,
          );
          throw error;
        }
      }
    },
    delete: async (context, { connection }) => {
      const targetUrl = context.webhookUrls[context.flow.name];

      const { data } = await listWebhookSubscriptions.perform(context, {
        connection,
      });

      const existingWebhooks = data || [];

      const existingWebhook = existingWebhooks.find(
        (webhook) => webhook.targetUrl === targetUrl,
      );

      if (existingWebhook) {
        try {
          const { data } = await deleteWebhookSubscription.perform(context, {
            connection,
            webhookId: existingWebhook.id,
          });
          context.logger.info(
            `Deleted webhook subscription with ID: ${data.webhookId}`,
          );
        } catch (error) {
          context.logger.error(
            `Failed to delete webhook subscription: ${(error as any).message}`,
          );
          throw error;
        }
      }
      context.logger.info(
        `No webhook subscription found for URL: ${targetUrl}`,
      );
    },
  },
});

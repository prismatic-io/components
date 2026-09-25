import { action, outputSchema } from "@prismatic-io/spectral";
import { rawHttpClient } from "../../auth";
import { createWebhookTriggerExamplePayload } from "../../examplePayloads";
import { createWebhookTriggerInputs } from "../../inputs";
import { createWebhookTriggerOutputSchema } from "../../outputSchemas";
import { fetchTriggers } from "../../util";
export const createWebhookTrigger = action({
  display: {
    label: "Create Webhook Trigger",
    description: "Create a Zendesk trigger that fires a webhook.",
  },
  inputs: createWebhookTriggerInputs,
  performSafety: "notAllowed",
  perform: async ({ logger }, params) => {
    const client = rawHttpClient(params.connection);
    const triggers = await fetchTriggers(client);
    const match = triggers.filter((trigger) => trigger.title === params.title);
    if (match.length && !params.allowDuplicates) {
      logger.info(
        `A trigger with the title "${params.title}" already exists. Skipping creation.`,
      );
      return { data: { trigger: match[0] } };
    }
    const { data } = await client.post("/triggers", {
      trigger: {
        title: params.title,
        actions: [
          {
            field: "notification_webhook",
            value: [params.webhookId, params.messageBody],
          },
        ],
        conditions: params.conditions,
      },
    });
    return { data };
  },
  examplePerform: async (
    _context,
    { conditions, messageBody, title, webhookId },
  ) => ({
    data: {
      ...createWebhookTriggerExamplePayload.data,
      trigger: {
        ...createWebhookTriggerExamplePayload.data.trigger,
        ...(title ? { title } : {}),
        actions: [
          {
            field: "notification_webhook",
            value: [webhookId, messageBody],
          },
        ],
        conditions,
      },
    },
  }),
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: createWebhookTriggerOutputSchema,
  }),
  examplePayload: createWebhookTriggerExamplePayload,
});

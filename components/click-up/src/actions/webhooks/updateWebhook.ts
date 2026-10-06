import { action, outputSchema } from "@prismatic-io/spectral";
import { createClickUpClient } from "../../client";
import { updateWebhookExamplePayload } from "../../examplePayloads";
import { updateWebhookInputs } from "../../inputs";
import { updateWebhookOutputSchema } from "../../outputSchemas";
import type { UpdateWebhookBody } from "../../types";
export const updateWebhook = action({
  display: {
    label: "Update Webhook",
    description: "Update the configuration of a webhook.",
  },
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: updateWebhookOutputSchema,
  }),
  examplePayload: updateWebhookExamplePayload,
  performSafety: "notAllowed",
  perform: async (
    context,
    { clickUpConnection, webhookId, endpoint, events, allEvents, status },
  ) => {
    const client = createClickUpClient(
      clickUpConnection,
      context.debug.enabled,
    );
    const body: UpdateWebhookBody = {
      endpoint,
      events: allEvents ? "*" : events,
      status,
    };
    const { data } = await client.put(`/webhook/${webhookId}`, body);
    return {
      data,
    };
  },
  examplePerform: async () => updateWebhookExamplePayload,
  inputs: updateWebhookInputs,
});

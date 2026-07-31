import { action, outputSchema } from "@prismatic-io/spectral";
import { createAuthorizedClient } from "../../client";
import { updateWebhookExamplePayload } from "../../examplePayloads";
import { eventsBuilder, updateWebhookHelper } from "../../helpers";
import { updateWebhookInputs } from "../../inputs";
import { updateWebhookOutputSchema } from "../../outputSchemas";
export const updateWebhook = action({
  display: {
    label: "Update Webhook",
    description: "Updates an existing Event Webhook configuration.",
  },
  inputs: updateWebhookInputs,
  perform: async (
    _context,
    { sendGridConnection, webhookId, url, friendlyName, enabled, events },
  ) => {
    const client = createAuthorizedClient(sendGridConnection);
    const eventsPayload = eventsBuilder(events);
    const data = await updateWebhookHelper(client, {
      webhookId,
      enabled,
      url,
      ...eventsPayload,
      friendlyName,
    });
    return {
      data,
    };
  },
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: updateWebhookOutputSchema,
  }),
  examplePayload: updateWebhookExamplePayload,
});

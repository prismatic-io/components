import { action, outputSchema } from "@prismatic-io/spectral";
import { rawHttpClient } from "../../auth";
import { deleteWebhookExamplePayload } from "../../examplePayloads";
import { deleteWebhookInputs } from "../../inputs";
import { deleteWebhookOutputSchema } from "../../outputSchemas";
export const deleteWebhook = action({
  display: {
    label: "Delete Webhook",
    description: "Delete a webhook by ID.",
  },
  inputs: deleteWebhookInputs,
  performSafety: "notAllowed",
  perform: async (_context, params) => {
    const client = rawHttpClient(params.zendeskConnection);
    const { data } = await client.delete(`/webhooks/${params.webhookId}`);
    return { data };
  },
  examplePerform: async () => deleteWebhookExamplePayload,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: deleteWebhookOutputSchema,
  }),
  examplePayload: deleteWebhookExamplePayload,
});

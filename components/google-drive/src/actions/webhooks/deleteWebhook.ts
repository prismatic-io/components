import { action, outputSchema } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { deleteWebhookInputs } from "../../inputs";
import { deleteWebhookOutputSchema } from "../../outputSchemas";
import { deleteWebhookExamplePayload } from "../../examplePayloads";
export const deleteWebhook = action({
  display: {
    label: "Delete Webhook",
    description: "Stop a webhook channel from sending notifications",
  },
  inputs: deleteWebhookInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: deleteWebhookOutputSchema,
  }),
  performSafety: "notAllowed",
  perform: async (_context, params) => {
    const client = createClient(params.connection);
    const { data } = await client.channels.stop({
      requestBody: {
        id: params.webhookId,
        resourceId: params.resourceId,
      },
    });
    return { data };
  },
  examplePerform: async (): Promise<{
    data: unknown;
  }> => ({ data: {} }),
  examplePayload: deleteWebhookExamplePayload,
});

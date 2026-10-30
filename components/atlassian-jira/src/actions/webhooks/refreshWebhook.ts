import { action, outputSchema } from "@prismatic-io/spectral";
import { createV3Client } from "../../client";
import { refreshWebhookExamplePayload } from "../../examplePayloads";
import { refreshWebhookInputs } from "../../inputs";
import { refreshWebhookOutputSchema } from "../../outputSchemas";

export const refreshWebhook = action({
  display: {
    label: "Refresh Webhook",
    description: "Refresh a webhook expiration by ID.",
  },
  inputs: refreshWebhookInputs,
  performSafety: "notAllowed",
  perform: async (context, params) => {
    const client = await createV3Client(
      params.jiraConnection,
      context.debug.enabled,
    );
    const { data } = await client.put("/webhook/refresh", {
      webhookIds: [params.webhookId],
    });
    return { data };
  },
  examplePerform: async () => refreshWebhookExamplePayload,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: refreshWebhookOutputSchema,
  }),
  examplePayload: refreshWebhookExamplePayload,
});

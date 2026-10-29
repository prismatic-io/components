import { action, outputSchema } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { WEBHOOKS_CONFIGURATION_PATH } from "../../constants";
import { deleteWebhookExamplePayload } from "../../examplePayloads";
import { deleteWebhookInputs } from "../../inputs";
import { deleteWebhookOutputSchema } from "../../outputSchemas";

export const deleteWebhook = action({
  display: {
    label: "Delete Webhook",
    description:
      "Delete a Datadog webhook integration by name. This action cannot be undone.",
  },
  inputs: deleteWebhookInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: deleteWebhookOutputSchema,
  }),
  performSafety: "notAllowed",
  perform: async (_context, { connection, webhookName }) => {
    const client = createClient(connection);

    await client.delete(
      `${WEBHOOKS_CONFIGURATION_PATH}/${encodeURIComponent(webhookName)}`,
    );

    return { data: null };
  },
  examplePerform: async (): Promise<{ data: unknown }> => ({
    ...deleteWebhookExamplePayload,
  }),
  examplePayload: deleteWebhookExamplePayload,
});

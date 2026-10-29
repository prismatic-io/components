import { action } from "@prismatic-io/spectral";
import { createAirtableClient } from "../../client";
import { deleteWebhookExamplePayload } from "../../examplePayloads";
import { deleteWebhookInputs } from "../../inputs";
import { getBaseId } from "../../util";

export const deleteWebhook = action({
  display: {
    label: "Delete Webhook",
    description: "Delete a webhook subscription from a base.",
  },
  perform: async (context, params) => {
    const client = createAirtableClient(
      params.airtableConnection,
      context.debug.enabled,
    );
    const baseId = getBaseId(params.airtableConnection, params.baseId);

    await client.delete(`/v0/bases/${baseId}/webhooks/${params.webhookId}`);

    return { data: {} };
  },
  inputs: deleteWebhookInputs,
  examplePayload: deleteWebhookExamplePayload,
});

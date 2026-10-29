import { action } from "@prismatic-io/spectral";
import { createAirtableClient } from "../../client";
import { refreshWebhookExamplePayload } from "../../examplePayloads";
import { refreshWebhookInputs } from "../../inputs";
import { getBaseId } from "../../util";

export const refreshWebhook = action({
  display: {
    label: "Refresh Webhook",
    description: "Extend the expiration of an existing webhook subscription.",
  },
  perform: async (context, params) => {
    const client = createAirtableClient(
      params.airtableConnection,
      context.debug.enabled,
    );
    const baseId = getBaseId(params.airtableConnection, params.baseId);

    const { data } = await client.post(
      `/v0/bases/${baseId}/webhooks/${params.webhookId}/refresh`,
    );

    return { data };
  },
  inputs: refreshWebhookInputs,
  examplePayload: refreshWebhookExamplePayload,
});

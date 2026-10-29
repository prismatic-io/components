import { action } from "@prismatic-io/spectral";
import { createAirtableClient } from "../../client";
import { createWebhookExamplePayload } from "../../examplePayloads";
import { createWebhookInputs } from "../../inputs";
import { getBaseId } from "../../util";

export const createWebhook = action({
  display: {
    label: "Create Webhook",
    description: "Create a new webhook subscription for a base.",
  },
  perform: async (context, params) => {
    const client = createAirtableClient(
      params.airtableConnection,
      context.debug.enabled,
    );
    const baseId = getBaseId(params.airtableConnection, params.baseId);

    const payload = {
      notificationUrl: params.notificationUrl,
      specification: params.specification,
    };

    const { data } = await client.post(`/v0/bases/${baseId}/webhooks`, payload);

    return { data };
  },
  inputs: createWebhookInputs,
  examplePayload: createWebhookExamplePayload,
});

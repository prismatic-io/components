import { action } from "@prismatic-io/spectral";
import { createClassicClient } from "../../client";
import { updateWebhookExamplePayload } from "../../examplePayloads";
import { updateWebhookInputs } from "../../inputs";
import { toWebhookXml } from "../../util";
export const updateWebhook = action({
  display: {
    label: "Update Webhook",
    description: "Update an existing webhook subscription.",
  },
  inputs: updateWebhookInputs,
  perform: async (context, { connection, resourceId, additionalFields }) => {
    const {
      webhookName,
      webhookEvent,
      webhookUrl,
      webhookContentType,
      webhookEnabled,
    } = additionalFields;
    const client = await createClassicClient(connection, context.debug.enabled);
    const body = toWebhookXml({
      name: webhookName,
      event: webhookEvent,
      url: webhookUrl,
      content_type: webhookContentType,
      enabled: webhookEnabled,
    });
    await client.put<unknown>(`/webhooks/id/${resourceId}`, body, {
      headers: { "Content-Type": "application/xml" },
    });
    return { data: { id: Number(resourceId) } };
  },
  examplePayload: updateWebhookExamplePayload,
});

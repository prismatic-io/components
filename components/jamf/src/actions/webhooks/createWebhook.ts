import { action } from "@prismatic-io/spectral";
import { createClassicClient } from "../../client";
import { createWebhookExamplePayload } from "../../examplePayloads";
import { createWebhookInputs } from "../../inputs";
import { parseWebhookId, toWebhookXml } from "../../util";
export const createWebhook = action({
  display: {
    label: "Create Webhook",
    description: "Create a new webhook subscription in Jamf Pro.",
  },
  inputs: createWebhookInputs,
  perform: async (
    context,
    { connection, webhookName, webhookEvent, webhookUrl, additionalFields },
  ) => {
    const {
      webhookContentType,
      webhookEnabled,
      webhookAuthType,
      webhookAuthHeaderName,
      webhookAuthHeaderValue,
    } = additionalFields;
    const client = await createClassicClient(connection, context.debug.enabled);
    let authFields: Record<string, string> = {};
    if (webhookAuthType === "HEADER") {
      if (!webhookAuthHeaderName || !webhookAuthHeaderValue) {
        throw new Error(
          "Header authentication requires both an Auth Header Name and an Auth Header Value.",
        );
      }
      authFields = {
        authentication_type: "HEADER",
        header: JSON.stringify({
          [webhookAuthHeaderName]: webhookAuthHeaderValue,
        }),
      };
    }
    const body = toWebhookXml({
      name: webhookName,
      event: webhookEvent,
      url: webhookUrl,
      content_type: webhookContentType,
      enabled: webhookEnabled,
      ...authFields,
    });
    const { data } = await client.post<unknown>("/webhooks/id/0", body, {
      headers: { "Content-Type": "application/xml" },
    });
    return { data: { id: parseWebhookId(data) ?? null } };
  },
  examplePayload: createWebhookExamplePayload,
});

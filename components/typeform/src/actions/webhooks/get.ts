import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { connection, formId, tag } from "../../inputs";
import { createWebhookResponse as getWebhookResponse } from "../../examplePayloads/webhooks";
import type { Webhook } from "../../interfaces/webhook";

export const getWebhook = action({
  display: {
    label: "Get Webhook",
    description: "Retrieve a single webhook.",
  },
  inputs: {
    formId,
    tag,
    connection,
  },
  perform: async (context, { connection, formId, tag }) => {
    const client = createClient(connection, context.debug.enabled);

    const { data } = await client.get<Webhook>(
      `/forms/${formId}/webhooks/${tag}`,
    );
    return {
      data,
    };
  },
  examplePayload: {
    data: getWebhookResponse,
  },
});

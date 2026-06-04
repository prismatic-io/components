import { action, input, util } from "@prismatic-io/spectral";
import { rawHttpClient } from "../../auth";
import { deleteWebhookPayload } from "../../examplePayloads";
import { connectionInput } from "../../inputs";

export const deleteWebhook = action({
  display: {
    label: "Delete Webhook",
    description: "Delete a webhook by ID.",
  },
  inputs: {
    zendeskConnection: connectionInput,
    webhookId: input({
      label: "Webhook ID",
      type: "string",
      required: true,
      clean: util.types.toString,
      example: "01GK59HW1XMB8WVZ43RPVAPXRM",
    }),
  },
  perform: async (context, params) => {
    const client = rawHttpClient(params.zendeskConnection);
    const { data } = await client.delete(`/webhooks/${params.webhookId}`);
    return { data };
  },
  examplePayload: {
    data: deleteWebhookPayload,
  },
});

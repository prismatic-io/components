import { action } from "@prismatic-io/spectral";
import { createBambooClient } from "../../client";
import { deleteWebhookByIdExamplePayload } from "../../examplePayloads";
import { deleteWebhookByIdInputs } from "../../inputs";


export const deleteWebhookById = action({
  display: {
    label: "Delete Webhook",
    description: "Delete a webhook by ID.",
  },
  inputs: deleteWebhookByIdInputs,
  perform: async (context, params) => {
    const client = createBambooClient(params.connection, context.debug.enabled);
    const { data } = await client.delete(`/v1/webhooks/${params.webhookId}/`);
    return { data };
  },
  examplePayload: deleteWebhookByIdExamplePayload,
});

import { action, outputSchema } from "@prismatic-io/spectral";
import { createBambooClient } from "../../client";
import { ENDPOINTS } from "../../constants";
import { deleteWebhookByIdExamplePayload } from "../../examplePayloads";
import { deleteWebhookByIdInputs } from "../../inputs";
import { deleteWebhookByIdOutputSchema } from "../../outputSchemas";

export const deleteWebhookById = action({
  display: {
    label: "Delete Webhook",
    description: "Delete a webhook by ID.",
  },
  inputs: deleteWebhookByIdInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: deleteWebhookByIdOutputSchema,
  }),
  performSafety: "notAllowed",
  perform: async (context, params) => {
    const client = createBambooClient(params.connection, context.debug.enabled);
    const { data } = await client.delete(
      `${ENDPOINTS.WEBHOOKS}/${params.webhookId}/`,
    );
    return { data };
  },
  examplePerform: async () => deleteWebhookByIdExamplePayload,
  examplePayload: deleteWebhookByIdExamplePayload,
});

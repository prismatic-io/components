import { action, outputSchema } from "@prismatic-io/spectral";
import { getShopifyGraphQlClient } from "../../../client";
import { deleteWebhookExamplePayload } from "../../../examplePayloads";
import { deleteWebhookInputs as inputs } from "../../../inputsGql";
import { deleteWebhookGqlOutputSchema } from "../../../outputSchemas";
import { deleteWebhookById } from "../../../util";

export const deleteWebhookGql = action({
  display: {
    label: "Delete Webhook",
    description: "Deletes a webhook by ID.",
  },
  inputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: deleteWebhookGqlOutputSchema,
  }),
  performSafety: "notAllowed",
  perform: async (context, { shopifyConnection, webhookId }) => {
    const client = getShopifyGraphQlClient(
      shopifyConnection,
      undefined,
      context.debug.enabled,
      context.logger,
    );

    await deleteWebhookById(client, webhookId);

    return { data: {} };
  },
  examplePerform: async () => deleteWebhookExamplePayload.restMap,
  examplePayload: deleteWebhookExamplePayload.restMap,
});

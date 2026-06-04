import { action } from "@prismatic-io/spectral";
import { getShopifyGraphQlClient } from "../../../client";
import { deleteWebhookExamplePayload } from "../../../examplePayloads";
import { deleteWebhookInputs as inputs } from "../../../inputsGql";
import { deleteWebhookById } from "../../../util";

export const deleteWebhookGql = action({
  display: {
    label: "Delete Webhook",
    description: "Deletes a webhook by ID.",
  },
  inputs,
  perform: async (context, { shopifyConnection, webhookId }) => {
    const client = getShopifyGraphQlClient(shopifyConnection, undefined, context.debug.enabled);

    await deleteWebhookById(client, webhookId);

    return { data: {} };
  },
  examplePayload: deleteWebhookExamplePayload.restMap,
});

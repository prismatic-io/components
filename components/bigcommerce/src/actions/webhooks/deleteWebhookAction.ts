import { action, util } from "@prismatic-io/spectral";
import { handleErrors } from "@prismatic-io/spectral/dist/clients/http";
import { createAuthorizedClient } from "../../client";
import { deleteWebhookExamplePayload } from "../../examplePayloads";
import { bigCommerceConnection, storeHash, webhookIdInput } from "../../inputs";

export const deleteWebhookAction = action({
  display: {
    label: "Delete Webhook",
    description: "Deletes a specific webhook from BigCommerce.",
  },
  examplePayload: deleteWebhookExamplePayload,
  perform: async (
    context,
    { bigCommerceConnection, storeHash, webhook_id },
  ) => {
    const client = await createAuthorizedClient(
      bigCommerceConnection,
      context.debug.enabled,
    );
    const endpoint = `/stores/${storeHash}/v3/hooks/${webhook_id}`;

    try {
      const response = await client.delete(endpoint);
      return {
        data: response.data,
      };
    } catch (error) {
      const handled = handleErrors(error);
      const serialized = util.types.toJSON(handled);
      throw new Error(serialized);
    }
  },

  inputs: {
    bigCommerceConnection,
    storeHash: storeHash,
    webhook_id: webhookIdInput,
  },
});

import { action, util } from "@prismatic-io/spectral";
import { handleErrors } from "@prismatic-io/spectral/dist/clients/http";
import { createAuthorizedClient } from "../../client";
import { updateWebhookExamplePayload } from "../../examplePayloads";
import {
  bigCommerceConnection,
  storeHash,
  webhookDestinationInput,
  webhookHeadersInput,
  webhookIdInput,
  webhookIsActiveInput,
  webhookScopeInput,
} from "../../inputs";

export const updateWebhookAction = action({
  display: {
    label: "Update Webhook",
    description: "Updates an existing webhook in BigCommerce.",
  },
  examplePayload: updateWebhookExamplePayload,
  perform: async (
    context,
    {
      bigCommerceConnection,
      storeHash,
      webhook_id,
      scope,
      destination,
      is_active,
      headers,
    },
  ) => {
    const client = await createAuthorizedClient(
      bigCommerceConnection,
      context.debug.enabled,
    );
    const endpoint = `/stores/${storeHash}/v3/hooks/${webhook_id}`;

    const data = {
      scope,
      destination,
      is_active,
      headers,
    };

    try {
      const response = await client.put(endpoint, data);
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
    scope: webhookScopeInput,
    destination: webhookDestinationInput,
    is_active: webhookIsActiveInput,
    headers: webhookHeadersInput,
  },
});

import { action, util } from "@prismatic-io/spectral";
import { handleErrors } from "@prismatic-io/spectral/dist/clients/http";
import { createAuthorizedClient } from "../../client";
import { createWebhookExamplePayload } from "../../examplePayloads";
import {
  bigCommerceConnection,
  storeHash,
  webhookDestinationInput,
  webhookEventsHistoryEnabledInput,
  webhookHeadersInput,
  webhookIsActiveInput,
  webhookScopeInput,
} from "../../inputs";

export const createWebhookAction = action({
  display: {
    label: "Create Webhook",
    description: "Creates a new webhook in BigCommerce.",
  },
  examplePayload: createWebhookExamplePayload,
  perform: async (
    context,
    {
      bigCommerceConnection,
      storeHash,
      scope,
      destination,
      is_active,
      events_history_enabled,
      headers,
    },
  ) => {
    const client = await createAuthorizedClient(
      bigCommerceConnection,
      context.debug.enabled,
    );
    const endpoint = `/stores/${storeHash}/v3/hooks`;

    const data = {
      scope,
      destination,
      is_active,
      events_history_enabled,
      headers,
    };

    try {
      const response = await client.post(endpoint, data);
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
    scope: webhookScopeInput,
    destination: webhookDestinationInput,
    is_active: webhookIsActiveInput,
    events_history_enabled: webhookEventsHistoryEnabledInput,
    headers: webhookHeadersInput,
  },
});

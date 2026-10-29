import { action, util } from "@prismatic-io/spectral";
import { handleErrors } from "@prismatic-io/spectral/dist/clients/http";
import { createAuthorizedClient } from "../../client";
import { getWebhooksExamplePayload } from "../../examplePayloads";
import {
  bigCommerceConnection,
  storeHash,
  webhookDestinationInput,
  webhookIsActiveInput,
  webhookLimitInput,
  webhookPageInput,
  webhookScopeInput,
} from "../../inputs";

export const getWebhooksAction = action({
  display: {
    label: "List Webhooks",
    description: "Returns a list of all webhooks on a store.",
  },
  examplePayload: getWebhooksExamplePayload,
  perform: async (
    context,
    {
      bigCommerceConnection,
      storeHash,
      page,
      limit,
      is_active,
      scope,
      destination,
    },
  ) => {
    const client = await createAuthorizedClient(
      bigCommerceConnection,
      context.debug.enabled,
    );
    const endpoint = `/stores/${storeHash}/v3/hooks`;

    const params = {
      page,
      limit,
      is_active,
      scope,
      destination,
    };

    try {
      const response = await client.get(endpoint, { params });
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
    page: webhookPageInput,
    limit: webhookLimitInput,
    is_active: webhookIsActiveInput,
    scope: webhookScopeInput,
    destination: webhookDestinationInput,
  },
});

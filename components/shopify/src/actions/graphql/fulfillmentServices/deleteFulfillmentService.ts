import { action } from "@prismatic-io/spectral";
import { getShopifyGraphQlClient } from "../../../client";
import { deleteFulfillmentServiceExamplePayload as examplePayload } from "../../../examplePayloads";
import { deleteFulfillmentServiceInputs as inputs } from "../../../inputsGql";

import deleteFulfillmentServiceQuery from "../queries/fulfillmentServices/DeleteFulfillmentService.gql";

export const deleteFulfillmentServiceGql = action({
  display: {
    label: "Delete Fulfillment Service",
    description: "Deletes an existing fulfillment service.",
  },
  inputs,
  perform: async (context, { shopifyConnection, fulfillmentServiceId }) => {
    const client = getShopifyGraphQlClient(shopifyConnection, undefined, context.debug.enabled);

    const data: { fulfillmentServiceDelete: Record<string, unknown> } = await client.request(
      deleteFulfillmentServiceQuery,
      {
        id: fulfillmentServiceId,
      },
    );

    return {
      data: data.fulfillmentServiceDelete,
    };
  },
  examplePayload,
});

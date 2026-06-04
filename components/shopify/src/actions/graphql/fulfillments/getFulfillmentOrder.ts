import { action } from "@prismatic-io/spectral";
import { getShopifyGraphQlClient } from "../../../client";
import { getFulfillmentOrderExamplePayload } from "../../../examplePayloads";
import { getFulfillmentOrderInputs as inputs } from "../../../inputsGql";
import type { FulfillmentOrder } from "../../interfaces/FulfillmentOrder";
import { fulfillmentOrderMapper } from "../mappers/fulfillmentOrderMapper";
import getFulfillmentOrderQuery from "../queries/fulfillments/GetFulfillmentOrder.gql";

export const getFulfillmentOrderGql = action({
  display: {
    label: "Get Fulfillment Order",
    description: "Retrieves a specific fulfillment order by ID.",
  },
  inputs,
  perform: async (context, { shopifyConnection, fulfillmentOrderId }) => {
    const client = getShopifyGraphQlClient(shopifyConnection, undefined, context.debug.enabled);

    const data: { fulfillmentOrder: FulfillmentOrder } = await client.request(
      getFulfillmentOrderQuery,
      {
        id: fulfillmentOrderId,
      },
    );
    return {
      data: {
        data: {
          fulfillment_order: fulfillmentOrderMapper(data.fulfillmentOrder),
        },
      },
    };
  },
  examplePayload: getFulfillmentOrderExamplePayload.restMap,
});

import { action } from "@prismatic-io/spectral";
import { getShopifyGraphQlClient } from "../../../client";
import { listFulfillmentsExamplePayload } from "../../../examplePayloads";
import { listFulfillmentsInputs as inputs } from "../../../inputsGql";
import type { Fulfillment } from "../../interfaces/Fulfillment";
import { fulfillmentMapper } from "../mappers/fulfillmentMapper";
import listFulfillmentsQuery from "../queries/fulfillments/ListFulfillments.gql";

export const listFulfillmentsGql = action({
  display: {
    label: "List Fulfillments",
    description: "Lists all fulfillments for a specified order.",
  },
  perform: async (context, { shopifyConnection, orderId }) => {
    const client = getShopifyGraphQlClient(shopifyConnection, undefined, context.debug.enabled);
    
    const data: { order: { fulfillments: Fulfillment[] } } = await client.request(
      listFulfillmentsQuery,
      {
        orderId,
        first: 10000,
      },
    );

    return {
      data: {
        data: {
          fulfillments: data.order.fulfillments.map(fulfillmentMapper),
        },
      },
    };
  },
  inputs,
  examplePayload: listFulfillmentsExamplePayload.restMap,
});

import { action, outputSchema } from "@prismatic-io/spectral";
import { getShopifyGraphQlClient } from "../../../client";
import { getFulfillmentOrderExamplePayload } from "../../../examplePayloads";
import { getFulfillmentOrderInputs as inputs } from "../../../inputsGql";
import { getFulfillmentOrderGqlOutputSchema } from "../../../outputSchemas";
import type { FulfillmentOrder } from "../../../types";
import { fulfillmentOrderMapper } from "../mappers/fulfillmentOrderMapper";
import getFulfillmentOrderQuery from "../queries/fulfillments/GetFulfillmentOrder.gql";
export const getFulfillmentOrderGql = action({
  display: {
    label: "Get Fulfillment Order",
    description: "Retrieves a specific fulfillment order by ID.",
  },
  inputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: getFulfillmentOrderGqlOutputSchema,
  }),
  performSafety: "safe",
  perform: async (context, { shopifyConnection, fulfillmentOrderId }) => {
    const client = getShopifyGraphQlClient(
      shopifyConnection,
      undefined,
      context.debug.enabled,
      context.logger,
    );
    const data: {
      fulfillmentOrder: FulfillmentOrder;
    } = await client.request(getFulfillmentOrderQuery, {
      id: fulfillmentOrderId,
    });
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

import { action, outputSchema } from "@prismatic-io/spectral";
import { getShopifyGraphQlClient } from "../../../client";
import { getOrderExamplePayload as examplePayload } from "../../../examplePayloads";
import { getOrderInputs as inputs } from "../../../inputsGql";
import { getOrderGqlOutputSchema } from "../../../outputSchemas";

import getOrderQuery from "../queries/orders/GetOrder.gql";

export const getOrderGql = action({
  display: {
    label: "Get Order",
    description: "Retrieves an order by ID.",
  },
  performSafety: "safe",
  perform: async (context, { orderId, shopifyConnection }) => {
    const client = getShopifyGraphQlClient(
      shopifyConnection,
      undefined,
      context.debug.enabled,
      context.logger,
    );

    const data = await client.request(getOrderQuery, {
      id: orderId,
    });

    return {
      data,
    };
  },
  inputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: getOrderGqlOutputSchema,
  }),
  examplePayload,
});

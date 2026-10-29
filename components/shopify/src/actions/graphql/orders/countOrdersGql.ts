import { action, outputSchema } from "@prismatic-io/spectral";
import { getShopifyGraphQlClient } from "../../../client";
import { countOrdersExamplePayload as examplePayload } from "../../../examplePayloads";
import { countOrdersInputs as inputs } from "../../../inputsGql";
import { countOrdersGqlOutputSchema } from "../../../outputSchemas";
import type { Count } from "../../../types";
import countOrdersQuery from "../queries/orders/CountOrders.gql";

export const countOrdersGql = action({
  display: {
    label: "Count Orders",
    description: "Returns a count of all orders.",
  },
  performSafety: "safe",
  perform: async (context, { shopifyConnection }) => {
    const client = getShopifyGraphQlClient(
      shopifyConnection,
      undefined,
      context.debug.enabled,
      context.logger,
    );
    const data: { ordersCount: Count } = await client.request(countOrdersQuery);
    return { data: data.ordersCount };
  },
  inputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: countOrdersGqlOutputSchema,
  }),
  examplePayload,
});

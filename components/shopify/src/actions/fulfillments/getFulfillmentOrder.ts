import { action, outputSchema } from "@prismatic-io/spectral";
import { getFulfillmentOrderExamplePayload } from "../../examplePayloads";
import { getFulfillmentOrderInputs } from "../../inputs";
import { getFulfillmentOrderOutputSchema } from "../../outputSchemas";
import { getFulfillmentOrderGql } from "../graphql/fulfillments/getFulfillmentOrderGql";

export const getFulfillmentOrder = action({
  display: {
    label: "Get Fulfillment Order",
    description: "Retrieves a specific fulfillment order by ID.",
  },
  inputs: getFulfillmentOrderInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: getFulfillmentOrderOutputSchema,
  }),
  performSafety: "safe",
  perform: async (context, params) => {
    const { data } = await getFulfillmentOrderGql.perform(context, {
      shopifyConnection: params.shopifyConnection,
      fulfillmentOrderId: `gid://shopify/FulfillmentOrder/${params.fulfillmentOrderId}`,
    });
    return { data };
  },
  examplePayload: getFulfillmentOrderExamplePayload.restMap,
});

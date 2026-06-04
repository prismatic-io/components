import { action } from "@prismatic-io/spectral";
import { getFulfillmentOrderInputs } from "../../inputs";
import { getFulfillmentOrderExamplePayload } from "../../payloadExamples";
import { getFulfillmentOrderGql } from "../graphql/fulfillments/getFulfillmentOrder";

export const getFulfillmentOrder = action({
  display: {
    label: "Get Fulfillment Order",
    description: "Retrieves a specific fulfillment order by ID.",
  },
  inputs: getFulfillmentOrderInputs,
  perform: async (context, params) => {
    const { data } = await getFulfillmentOrderGql.perform(context, {
      shopifyConnection: params.shopifyConnection,
      fulfillmentOrderId: `gid://shopify/FulfillmentOrder/${params.fulfillmentOrderId}`,
    });
    return { data };
  },
  examplePayload: { data: getFulfillmentOrderExamplePayload },
});

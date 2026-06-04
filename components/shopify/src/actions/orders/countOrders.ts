import { action, util } from "@prismatic-io/spectral";
import { getShopifyClient } from "../../client";
import { countOrdersInputs } from "../../inputs";
import { countOrdersExamplePayload } from "../../payloadExamples";

export const countOrders = action({
  display: {
    label: "Count Orders (Deprecated)",
    description:
      "Returns a count of all orders. This version of the action is being deprecated. Please replace action with Count Orders.",
  },
  perform: async (context, { status, shopifyConnection }) => {
    const client = getShopifyClient(shopifyConnection, undefined, context.debug.enabled);

    return {
      data: (
        await client.get("/orders/count", {
          params: { status: util.types.toString(status) },
        })
      ).data,
    };
  },
  inputs: countOrdersInputs,
  examplePayload: {
    data: countOrdersExamplePayload,
  },
});

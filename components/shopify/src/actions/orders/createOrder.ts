import { action, util } from "@prismatic-io/spectral";
import { getShopifyClient } from "../../client";
import { createOrderInputs } from "../../inputs";
import { createOrderExamplePayload } from "../../payloadExamples";

export const createOrder = action({
  display: {
    label: "Create Order (Deprecated)",
    description:
      "Create a new order. This version of the action is being deprecated. Please replace action with Create Order.",
  },
  perform: async (context, params) => {
    const client = getShopifyClient(params.shopifyConnection, undefined, context.debug.enabled);

    const orderData = util.types.toString(params.orderData);
    if (!util.types.isJSON(orderData)) {
      throw new Error("Invalid Order JSON provided.");
    }

    const { data } = await client.post("/orders", {
      order: JSON.parse(orderData),
    });
    return { data };
  },
  examplePayload: {
    data: createOrderExamplePayload,
  },
  inputs: createOrderInputs,
});

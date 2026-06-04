import { action, util } from "@prismatic-io/spectral";
import { getShopifyClient } from "../../client";
import { createDraftOrderInputs } from "../../inputs";
import { createDraftOrderExamplePayload } from "../../payloadExamples";

export const createDraftOrder = action({
  display: {
    label: "Create Draft Orders (Deprecated)",
    description:
      "Create a new draft order. This version of the action is being deprecated. Please replace action with Create Draft Order.",
  },
  perform: async (context, params) => {
    const client = getShopifyClient(params.shopifyConnection, undefined, context.debug.enabled);
    const { data, headers } = await client.post("/draft_orders.json", {
      draft_order: {
        line_items:
          util.types.isJSON(util.types.toString(params.lineItems)) || []
            ? JSON.parse(util.types.toString(params.lineItems)) || []
            : params.lineItems || [],
        customer: params.customerId || undefined,
        use_customer_default_address: params.useCustomerAddress,
        taxes_included: util.types.toBool(params.taxIncluded),
        total_tax: util.types.toString(params.totalTax) || undefined,
        subtotal_price: util.types.toNumber(params.subTotalPrice) || undefined,
        total_price: util.types.toString(params.totalPrice) || undefined,
      },
    });
    return { data: { data, headers } };
  },
  inputs: createDraftOrderInputs,
  examplePayload: { data: createDraftOrderExamplePayload },
});

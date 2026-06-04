import { action } from "@prismatic-io/spectral";
import { getShopifyClient } from "../../client";
import { completeDraftOrderInputs } from "../../inputs";
import { completeDraftOrderExamplePayload } from "../../payloadExamples";

export const completeDraftOrder = action({
  display: {
    label: "Complete Draft Order (Deprecated)",
    description:
      "Mark a draft order as complete. This version of the action is being deprecated. Please replace action with Complete Draft Order.",
  },
  perform: async (context, params) => {
    const client = getShopifyClient(params.shopifyConnection, undefined, context.debug.enabled);
    const { data, headers } = await client.put(
      `/draft_orders/${params.draftOrderId}/complete.json`,
    );
    return { data: { data, headers } };
  },
  inputs: completeDraftOrderInputs,
  examplePayload: { data: completeDraftOrderExamplePayload },
});

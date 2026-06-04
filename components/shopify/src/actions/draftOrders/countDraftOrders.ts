import { action } from "@prismatic-io/spectral";
import { getShopifyClient } from "../../client";
import { countDraftOrdersInputs } from "../../inputs";
import { countDraftOrdersExamplePayload } from "../../payloadExamples";

export const countDraftOrders = action({
  display: { label: "Count Draft Orders (Deprecated)", description: "Count all draft orders." },
  perform: async (context, params) => {
    const client = getShopifyClient(params.shopifyConnection, undefined, context.debug.enabled);
    const { data, headers } = await client.get("/draft_orders/count.json");
    return { data: { data, headers } };
  },
  inputs: countDraftOrdersInputs,
  examplePayload: { data: countDraftOrdersExamplePayload },
});

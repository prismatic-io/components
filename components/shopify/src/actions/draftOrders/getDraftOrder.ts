import { action } from "@prismatic-io/spectral";
import { getShopifyClient } from "../../client";
import { getDraftOrderInputs } from "../../inputs";
import { getDraftOrderExamplePayload } from "../../payloadExamples";

export const getDraftOrder = action({
  display: {
    label: "Get Draft Order (Deprecated)",
    description:
      "Get the information and metadata of a Draft Order. This version of the action is being deprecated. Please replace action with Get Draft Order.",
  },
  perform: async (context, params) => {
    const client = getShopifyClient(params.shopifyConnection, undefined, context.debug.enabled);
    const { data, headers } = await client.get(`/draft_orders/${params.draftOrderId}.json`);
    return { data: { data, headers } };
  },
  inputs: getDraftOrderInputs,
  examplePayload: { data: getDraftOrderExamplePayload },
});

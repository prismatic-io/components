import { action } from "@prismatic-io/spectral";
import { getShopifyClient } from "../../client";
import { countVariantsInputs } from "../../inputs";
import { countVariantsExamplePayload } from "../../payloadExamples";

export const countVariants = action({
  display: {
    label: "Count Variants (Deprecated)",
    description:
      "Count all product variants. This version of the action is being deprecated. Please replace action with Count Variants",
  },
  perform: async (context, { productId, shopifyConnection }) => {
    const client = getShopifyClient(shopifyConnection, undefined, context.debug.enabled);
    const { data } = await client.get(`/products/${productId}/variants/count.json`);
    return {
      data,
    };
  },
  examplePayload: {
    data: countVariantsExamplePayload,
  },
  inputs: countVariantsInputs,
});

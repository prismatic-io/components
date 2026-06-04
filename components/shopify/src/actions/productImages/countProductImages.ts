import { action } from "@prismatic-io/spectral";
import { getShopifyClient } from "../../client";
import { countProductImagesInputs } from "../../inputs";
import { countProductImagesExamplePayload } from "../../payloadExamples";

export const countProductImages = action({
  display: {
    label: "Count Product Images (Deprecated)",
    description:
      "Count all product images connected to your platform. This version of the action is being deprecated. Please replace action with Count Product Images.",
  },
  perform: async (context, params) => {
    const client = getShopifyClient(params.shopifyConnection, undefined, context.debug.enabled);
    const { headers, data } = await client.get(`/products/${params.productId}/images/count.json`);

    return {
      data: { data, headers },
    };
  },
  inputs: countProductImagesInputs,
  examplePayload: {
    data: countProductImagesExamplePayload,
  },
});

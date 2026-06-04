import { action } from "@prismatic-io/spectral";
import { getShopifyClient } from "../../client";
import { getVariantInputs } from "../../inputs";
import { getVariantExamplePayload } from "../../payloadExamples";

export const getVariant = action({
  display: {
    label: "Get Variant",
    description: "Retrieves a product variant by ID.",
  },
  perform: async (context, { variantId, shopifyConnection }) => {
    const client = getShopifyClient(shopifyConnection, undefined, context.debug.enabled);
    const { data } = await client.get(`/variants/${variantId}`);
    return {
      data,
    };
  },
  examplePayload: {
    data: getVariantExamplePayload,
  },
  inputs: getVariantInputs,
});

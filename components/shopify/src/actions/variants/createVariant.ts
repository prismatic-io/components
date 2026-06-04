import { action } from "@prismatic-io/spectral";
import { getShopifyClient } from "../../client";
import { createVariantInputs } from "../../inputs";
import { createVariantExamplePayload } from "../../payloadExamples";

export const createVariant = action({
  display: {
    label: "Create Variant (Deprecated)",
    description:
      "Create a new variant of the provided product. This version of the action is being deprecated. Please replace action with Create Variant",
  },
  perform: async (
    context,
    { productId, variantTitle, price, sku, weight, fieldValues, shopifyConnection },
  ) => {
    const client = getShopifyClient(shopifyConnection, undefined, context.debug.enabled);
    return {
      data: (
        await client.post(`/products/${productId}/variants`, {
          variant: {
            option1: variantTitle,
            price: price,
            sku: sku,
            weight: weight,
            ...((fieldValues as Record<string, unknown>) || {}),
          },
        })
      ).data,
    };
  },
  examplePayload: {
    data: createVariantExamplePayload,
  },
  inputs: createVariantInputs,
});

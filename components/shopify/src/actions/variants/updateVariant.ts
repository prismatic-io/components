import { action } from "@prismatic-io/spectral";
import { getShopifyClient } from "../../client";
import { updateVariantInputs } from "../../inputs";
import { updateVariantExamplePayload } from "../../payloadExamples";

export const updateVariant = action({
  display: {
    label: "Update Variant (Deprecated)",
    description:
      "Update the information and metadata of an existing product variant by Id. This version of the action is being deprecated. Please replace action with Update Variant",
  },
  perform: async (
    context,
    { variantId, updatePrice, updateVariantTitle, sku, weight, fieldValues, shopifyConnection },
  ) => {
    const client = getShopifyClient(shopifyConnection, undefined, context.debug.enabled);
    const { data } = await client.put(`/variants/${variantId}`, {
      variant: {
        id: variantId,
        option1: updateVariantTitle || undefined,
        price: updatePrice || undefined,
        sku: sku || undefined,
        weight: weight || undefined,
        ...((fieldValues as Record<string, unknown>) || {}),
      },
    });
    return {
      data,
    };
  },
  examplePayload: {
    data: updateVariantExamplePayload,
  },
  inputs: updateVariantInputs,
});

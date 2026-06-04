import { action } from "@prismatic-io/spectral";
import { getShopifyGraphQlClient } from "../../../client";
import { getVariantExamplePayload as examplePayload } from "../../../examplePayloads";
import { getVariantInputs as inputs } from "../../../inputsGql";
import getVariantQuery from "../queries/variants/GetVariant.gql";

export const getVariantGql = action({
  display: {
    label: "Get Variant",
    description: "Retrieves a product variant by ID.",
  },
  perform: async (context, { variantId, shopifyConnection }) => {
    const client = getShopifyGraphQlClient(shopifyConnection, undefined, context.debug.enabled);
    const data = await client.request(getVariantQuery, {
      id: variantId,
    });

    return {
      data,
    };
  },
  examplePayload,
  inputs,
});

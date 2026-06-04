import { action } from "@prismatic-io/spectral";
import { getShopifyGraphQlClient } from "../../../client";
import { createVariantExamplePayload as examplePayload } from "../../../examplePayloads";
import { createVariantInputs as inputs } from "../../../inputsGql";
import createVariantQuery from "../queries/variants/CreateVariant.gql";

export const createVariantGql = action({
  display: {
    label: "Create Variant",
    description: "Creates a new variant for the specified product.",
  },
  perform: async (context, { productId, variant, shopifyConnection }) => {
    const client = getShopifyGraphQlClient(shopifyConnection, undefined, context.debug.enabled);

    const data: {
      productVariantsBulkCreate: Record<string, unknown>;
    } = await client.request(createVariantQuery, {
      productId,
      variants: [variant],
    });

    return {
      data: data.productVariantsBulkCreate,
    };
  },
  examplePayload,
  inputs,
});

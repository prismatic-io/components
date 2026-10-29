import { action, outputSchema } from "@prismatic-io/spectral";
import { getShopifyGraphQlClient } from "../../../client";
import { getVariantExamplePayload as examplePayload } from "../../../examplePayloads";
import { getVariantInputs as inputs } from "../../../inputsGql";
import { getVariantGqlOutputSchema } from "../../../outputSchemas";
import getVariantQuery from "../queries/variants/GetVariant.gql";

export const getVariantGql = action({
  display: {
    label: "Get Variant",
    description: "Retrieves a product variant by ID.",
  },
  performSafety: "safe",
  perform: async (context, { variantId, shopifyConnection }) => {
    const client = getShopifyGraphQlClient(
      shopifyConnection,
      undefined,
      context.debug.enabled,
      context.logger,
    );
    const data = await client.request(getVariantQuery, {
      id: variantId,
    });

    return {
      data,
    };
  },
  examplePayload,
  inputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: getVariantGqlOutputSchema,
  }),
});

import { action, outputSchema } from "@prismatic-io/spectral";
import { getShopifyGraphQlClient } from "../../../client";
import { createProductImageExamplePayload as examplePayload } from "../../../examplePayloads";
import { createProductImageInputs as inputs } from "../../../inputsGql";
import { createProductImageGqlOutputSchema } from "../../../outputSchemas";
import createProductImageQuery from "../queries/productImage/CreateProductImage.gql";

export const createProductImageGql = action({
  display: {
    label: "Create Product Image",
    description: "Creates a new image for an existing product.",
  },
  performSafety: "notAllowed",
  perform: async (
    context,
    { productId, imageURL, imageAlt, shopifyConnection },
  ) => {
    const client = getShopifyGraphQlClient(
      shopifyConnection,
      undefined,
      context.debug.enabled,
      context.logger,
    );

    const data: { productCreateMedia: Record<string, unknown> } =
      await client.request(createProductImageQuery, {
        id: productId,
        originalSource: imageURL,
        alt: imageAlt,
      });

    return {
      data: data.productCreateMedia,
    };
  },
  inputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: createProductImageGqlOutputSchema,
  }),
  examplePerform: async () => examplePayload,
  examplePayload,
});

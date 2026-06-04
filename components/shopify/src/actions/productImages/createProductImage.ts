import { action, util } from "@prismatic-io/spectral";
import { getShopifyClient } from "../../client";
import { createProductImageInputs } from "../../inputs";
import { createProductImageExamplePayload } from "../../payloadExamples";

export const createProductImage = action({
  display: {
    label: "Create Product Image (Deprecated)",
    description:
      "Create a new image on an existing product. This version of the action is being deprecated. Please replace action with Create Product Image.",
  },
  perform: async (context, params) => {
    const client = getShopifyClient(params.shopifyConnection, undefined, context.debug.enabled);
    const { headers, data } = await client.post(`/products/${params.productId}/images.json`, {
      image: {
        src: util.types.toString(params.imageURL),
        filename: util.types.toString(params.fileName),
        position: util.types.toInt(params.imagePosition) || undefined,
        Alt: util.types.toString(params.imageAlt) || undefined,
      },
    });

    return {
      data: { data, headers },
    };
  },
  inputs: createProductImageInputs,
  examplePayload: {
    data: createProductImageExamplePayload,
  },
});

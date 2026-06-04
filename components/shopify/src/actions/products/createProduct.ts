import { action } from "@prismatic-io/spectral";
import { getShopifyClient } from "../../client";
import { createProductInputs } from "../../inputs";
import { createProductExamplePayload } from "../../payloadExamples";

export const createProduct = action({
  display: {
    label: "Create Product (Deprecated)",
    description:
      "Create a new product. This version of the action is being deprecated. Please replace action with Create Product.",
  },
  perform: async (
    context,
    { title, body, productType, vendor, imageUrl, tags, fieldValues, shopifyConnection },
  ) => {
    const client = getShopifyClient(shopifyConnection, undefined, context.debug.enabled);
    return {
      data: (
        await client.post("/products", {
          product: {
            title: title,
            body_html: body,
            vendor: vendor,
            product_type: productType,
            tags: tags,
            images: [{ src: imageUrl }],
            ...((fieldValues as Record<string, unknown>) || {}),
          },
        })
      ).data,
    };
  },
  inputs: createProductInputs,
  examplePayload: {
    data: createProductExamplePayload,
  },
});

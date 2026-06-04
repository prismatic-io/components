import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { connectionInput, productId, merchantId } from "../../inputs";
import { getProductExamplePayload } from "../../examplePayloads";

export const getProduct = action({
  display: {
    description: "Retrieves a product from your Merchant Center account.",
    label: "Get Product",
  },
  inputs: {
    connectionInput,
    merchantId,
    productId,
  },
  perform: async (_context, { connectionInput, productId, merchantId }) => {
    const client = createClient(connectionInput);
    const { data } = await client.products.get({
      merchantId,
      productId,
    });
    return {
      data,
    };
  },
  examplePayload: getProductExamplePayload,
});

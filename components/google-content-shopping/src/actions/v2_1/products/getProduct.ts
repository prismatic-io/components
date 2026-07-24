import { action } from "@prismatic-io/spectral";
import { createClient } from "../../../client";
import { getProductExamplePayload } from "../../../examplePayloads/v2_1";
import { getProductInputs } from "../../../inputs/v2_1";
export const getProduct = action({
  display: {
    description: "Retrieves a product from the Merchant Center account.",
    label: "Get Product (Legacy v2.1)",
  },
  inputs: getProductInputs,
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

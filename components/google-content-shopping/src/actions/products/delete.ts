import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { connectionInput, feedId, merchantId, productId } from "../../inputs";
import { deleteProductExamplePayload } from "../../examplePayloads";

export const deleteProduct = action({
  display: {
    description: "Deletes a product from your Merchant Center account.",
    label: "Delete Product",
  },
  inputs: {
    connectionInput,
    merchantId,
    productId,
    feedId,
  },
  perform: async (
    _context,
    { connectionInput, productId, merchantId, feedId },
  ) => {
    const client = createClient(connectionInput);
    const { data } = await client.products.delete({
      merchantId,
      productId,
      feedId,
    });
    return {
      data,
    };
  },
  examplePayload: deleteProductExamplePayload,
});

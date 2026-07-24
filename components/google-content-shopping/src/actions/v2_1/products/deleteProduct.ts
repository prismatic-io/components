import { action } from "@prismatic-io/spectral";
import { createClient } from "../../../client";
import { deleteProductExamplePayload } from "../../../examplePayloads/v2_1";
import { deleteProductInputs } from "../../../inputs/v2_1";
export const deleteProduct = action({
  display: {
    description: "Deletes a product from the Merchant Center account.",
    label: "Delete Product (Legacy v2.1)",
  },
  inputs: deleteProductInputs,
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

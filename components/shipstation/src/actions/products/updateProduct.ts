import { action } from "@prismatic-io/spectral";
import { createShipStationClient } from "../../client";
import { updateProductExamplePayload } from "../../examplePayloads";
import { updateProductInputs } from "../../inputs";

export const updateProduct = action({
  display: {
    label: "Update Product",
    description: "Updates an existing product.",
  },
  perform: async (context, { productId, productData, connectionInput }) => {
    const client = createShipStationClient(
      connectionInput,
      context.debug.enabled,
    );

    const { data } = await client.put(`/products/${productId}`, productData);
    return { data };
  },
  inputs: updateProductInputs,
  examplePayload: updateProductExamplePayload,
});

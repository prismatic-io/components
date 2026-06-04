import { action } from "@prismatic-io/spectral";
import { getClient } from "../../client";
import { connection, site, company } from "../../inputs/general";
import deleteProductInputs from "../../inputs/product/deleteProductInputs";
import { emptyPayload } from "../../examplePayloads";

export const deleteProduct = action({
  display: {
    label: "Delete Product",
    description: "Delete a product by ID",
  },
  perform: async (context, { connection, site, company, productId }) => {
    const client = getClient(connection, context.debug.enabled, site, company);
    const { data } = await client.delete(`/products/${productId}`);
    return {
      data,
    };
  },
  inputs: {
    connection,
    site,
    company,
    ...deleteProductInputs,
  },
  examplePayload: emptyPayload,
});

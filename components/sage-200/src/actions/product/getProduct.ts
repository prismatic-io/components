import { action } from "@prismatic-io/spectral";
import { getClient } from "../../client";
import { connection, site, company } from "../../inputs/general";
import getProductInputs from "../../inputs/product/getProductInputs";
import { getProductPayload } from "../../examplePayloads";

export const getProduct = action({
  display: {
    label: "Get Product",
    description: "Retrieve a product by ID",
  },
  perform: async (context, { connection, site, company, productId }) => {
    const client = getClient(connection, context.debug.enabled, site, company);
    const { data } = await client.get(`/products/${productId}`);
    return {
      data,
    };
  },
  inputs: {
    connection,
    site,
    company,
    ...getProductInputs,
  },
  examplePayload: getProductPayload,
});

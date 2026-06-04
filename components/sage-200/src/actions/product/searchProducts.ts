import { action } from "@prismatic-io/spectral";
import { getClient } from "../../client";
import { connection, site, company } from "../../inputs/general";
import { searchProductsPayload } from "../../examplePayloads";

export const searchProducts = action({
  display: {
    label: "Search Products",
    description: "Search the list of products",
  },
  perform: async (context, { connection, site, company }) => {
    const client = getClient(connection, context.debug.enabled, site, company);
    const { data } = await client.get("/lookup_products");
    return {
      data,
    };
  },
  inputs: {
    connection,
    site,
    company,
  },
  examplePayload: searchProductsPayload,
});

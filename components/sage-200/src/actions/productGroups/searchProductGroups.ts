import { action } from "@prismatic-io/spectral";
import { getClient } from "../../client";
import { connection, site, company } from "../../inputs/general";
import { searchProductGroupsPayload } from "../../examplePayloads";

export const searchProductGroups = action({
  display: {
    label: "Search Product Groups",
    description: "Search the list of product groups",
  },
  perform: async (context, { connection, site, company }) => {
    const client = getClient(connection, context.debug.enabled, site, company);
    const { data } = await client.get("/lookup_product_groups");
    return {
      data,
    };
  },
  inputs: {
    connection,
    site,
    company,
  },
  examplePayload: searchProductGroupsPayload,
});

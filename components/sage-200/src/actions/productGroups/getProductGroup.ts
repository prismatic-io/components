import { action } from "@prismatic-io/spectral";
import { getClient } from "../../client";
import { connection, site, company } from "../../inputs/general";
import getProductGroupInputs from "../../inputs/productGroups/getProductGroupInputs";
import { getProductGroupPayload } from "../../examplePayloads";

export const getProductGroup = action({
  display: {
    label: "Get Product Group",
    description: "Retrieve a product group by ID",
  },
  perform: async (context, { connection, site, company, productGroupId }) => {
    const client = getClient(connection, context.debug.enabled, site, company);
    const { data } = await client.get(`/product_groups/${productGroupId}`);
    return {
      data,
    };
  },
  inputs: {
    connection,
    site,
    company,
    ...getProductGroupInputs,
  },
  examplePayload: getProductGroupPayload,
});

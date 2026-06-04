import { action } from "@prismatic-io/spectral";
import { getClient } from "../../client";
import { connection, site, company } from "../../inputs/general";
import { listPricingSourceTypesPayload } from "../../examplePayloads";

export const listPricingSourceTypes = action({
  display: {
    label: "List Pricing Source Types",
    description: "Retrieve a list of pricing source types",
  },
  perform: async (context, { connection, site, company }) => {
    const client = getClient(connection, context.debug.enabled, site, company);
    const { data } = await client.get("/pricing_source_types");
    return {
      data,
    };
  },
  inputs: {
    connection,
    site,
    company,
  },
  examplePayload: listPricingSourceTypesPayload,
});

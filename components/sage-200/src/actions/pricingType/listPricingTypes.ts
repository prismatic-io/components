import { action } from "@prismatic-io/spectral";
import { getClient } from "../../client";
import { connection, site, company } from "../../inputs/general";
import { listPricingTypesPayload } from "../../examplePayloads";

export const listPricingTypes = action({
  display: {
    label: "List Pricing Types",
    description: "Retrieve a list of pricing types",
  },
  perform: async (context, { connection, site, company }) => {
    const client = getClient(connection, context.debug.enabled, site, company);
    const { data } = await client.get("/pricing_types");
    return {
      data,
    };
  },
  inputs: {
    connection,
    site,
    company,
  },
  examplePayload: listPricingTypesPayload,
});

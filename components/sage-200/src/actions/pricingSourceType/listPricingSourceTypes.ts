import { action } from "@prismatic-io/spectral";
import { getClient } from "../../client";
import { listPricingSourceTypesPayload } from "../../examplePayloads";
import { paginateResults } from "../../helpers/pagination";
import { company, connection, fetchAll, site } from "../../inputs/general";

export const listPricingSourceTypes = action({
  display: {
    label: "List Pricing Source Types",
    description: "Retrieve a list of pricing source types",
  },
  perform: async (context, { connection, site, company, fetchAll }) => {
    const client = getClient(connection, context.debug.enabled, site, company);
    return await paginateResults({
      client,
      endpoint: "/pricing_source_types",
      fetchAll,
    });
  },
  inputs: {
    connection,
    site,
    company,
    fetchAll,
  },
  examplePayload: listPricingSourceTypesPayload,
});

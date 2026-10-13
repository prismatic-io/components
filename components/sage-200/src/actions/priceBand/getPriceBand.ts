import { action } from "@prismatic-io/spectral";
import { getClient } from "../../client";
import { getPriceBandPayload } from "../../examplePayloads";
import { company, connection, site } from "../../inputs/general";
import getPriceBandInputs from "../../inputs/priceBand/getPriceBandInputs";
export const getPriceBand = action({
  display: {
    label: "Get Price Band",
    description: "Retrieve a price band by ID",
  },
  perform: async (context, { connection, site, company, priceBandId }) => {
    const client = getClient(connection, context.debug.enabled, site, company);
    const { data } = await client.get(`/price_bands/${priceBandId}`);
    return {
      data,
    };
  },
  inputs: {
    connection,
    site,
    company,
    ...getPriceBandInputs,
  },
  examplePayload: getPriceBandPayload,
});

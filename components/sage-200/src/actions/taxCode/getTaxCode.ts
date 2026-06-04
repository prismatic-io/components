import { action } from "@prismatic-io/spectral";
import { getClient } from "../../client";
import { connection, site, company } from "../../inputs/general";
import { taxCodeId } from "../../inputs/taxCode/getTaxCodeInputs";
import { getTaxCodePayload } from "../../examplePayloads";

export const getTaxCode = action({
  display: {
    label: "Get Tax Code",
    description: "Retrieve a tax code by ID",
  },
  perform: async (context, { connection, site, company, taxCodeId }) => {
    const client = getClient(connection, context.debug.enabled, site, company);
    const { data } = await client.get(`/tax_codes/${taxCodeId}`);
    return {
      data,
    };
  },
  inputs: {
    connection,
    site,
    company,
    taxCodeId,
  },
  examplePayload: getTaxCodePayload,
});

import { action } from "@prismatic-io/spectral";
import { getClient } from "../../client";
import { connection, site, company } from "../../inputs/general";
import getCustomerPriceBandInputs from "../../inputs/customerPriceBand/getCustomerPriceBandInputs";
import { getCustomerPriceBandPayload } from "../../examplePayloads";

export const getCustomerPriceBand = action({
  display: {
    label: "Get Customer Price Band",
    description: "Retrieve a customer price band by ID",
  },
  perform: async (
    context,
    { connection, site, company, customerPriceBandId },
  ) => {
    const client = getClient(connection, context.debug.enabled, site, company);
    const { data } = await client.get(
      `/customer_price_bands/${customerPriceBandId}`,
    );
    return {
      data,
    };
  },
  inputs: {
    connection,
    site,
    company,
    ...getCustomerPriceBandInputs,
  },
  examplePayload: getCustomerPriceBandPayload,
});

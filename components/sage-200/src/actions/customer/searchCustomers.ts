import { action } from "@prismatic-io/spectral";
import { getClient } from "../../client";
import { connection, site, company } from "../../inputs/general";
import { searchCustomersPayload } from "../../examplePayloads";

export const searchCustomers = action({
  display: {
    label: "Search Customers",
    description: "Search customer list",
  },
  perform: async (context, { connection, site, company }) => {
    const client = getClient(connection, context.debug.enabled, site, company);
    const { data } = await client.get("/lookup_customers");
    return {
      data,
    };
  },
  inputs: {
    connection,
    site,
    company,
  },
  examplePayload: searchCustomersPayload,
});

import { dataSource, type Element, util } from "@prismatic-io/spectral";
import { getClient } from "../client";
import { selectCustomerPayload } from "../examplePayloads";
import { company, connection, site } from "../inputs/general";

export const selectCustomer = dataSource({
  display: {
    label: "Select Customer",
    description: "Select a customer from a dropdown list",
  },
  perform: async (_context, { connection, site, company }) => {
    const client = getClient(connection, false, site, company);
    const { data } = await client.get<{ name: string; id: number }[]>("/customers");

    const objects = data.map<Element>((customer) => ({
      key: util.types.toString(customer.id),
      label: customer.name,
    }));

    return { result: objects };
  },
  dataSourceType: "picklist",
  inputs: {
    connection,
    site,
    company,
  },
  examplePayload: selectCustomerPayload,
});

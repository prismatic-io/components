import { dataSource, type Element } from "@prismatic-io/spectral";
import { createClient } from "../client";
import { selectCustomersExamplePayload } from "../examplePayloads";
import { selectCustomersInputs } from "../inputs";
import type { Customer } from "../types";
export const selectCustomers = dataSource({
  display: {
    label: "Select Customer",
    description:
      "Select a customer from a dropdown menu (up to 10,000 customers)",
  },
  inputs: selectCustomersInputs,
  perform: async (_context, { connection }) => {
    const client = createClient(connection, "crm");
    let customers: Customer[] = [];
    let cursor = false;
    let page = 1;
    do {
      const { data } = await client.get(`/customers`, {
        params: {
          includeTotal: true,
          page,
          pageSize: 1000,
        },
      });
      customers = [...customers, ...data.data];
      cursor = data.hasMore;
      page++;
    } while (cursor && page < 10);
    const objects = customers
      .sort((a, b) => (a.name < b.name ? -1 : 1))
      .map<Element>((customer) => ({
        key: customer.id.toString(),
        label: `${customer.name} (ID: ${customer.id})`,
      }));
    return { result: objects };
  },
  dataSourceType: "picklist",
  examplePayload: selectCustomersExamplePayload,
});

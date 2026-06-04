import { dataSource, type Element, util } from "@prismatic-io/spectral";
import { createClient } from "../client";
import { selectCustomerInputs as inputs } from "../inputs/customers";
import type { ListCustomersResponse } from "../interfaces/customers";
import { selectCustomerExamplePayload as examplePayload } from "../examplePayloads/dataSources";
import { fetchAllWithPagination } from "../utils/fetchAllWithPagination";

export const selectCustomer = dataSource({
  display: {
    label: "Select Customer",
    description: "Allow a user to select one of their customers.",
  },
  dataSourceType: "picklist",
  perform: async (context, { connection, ...configVars }) => {
    const client = createClient({
      connection,
      debug: false,
    });

    const { data } = await fetchAllWithPagination<ListCustomersResponse>({
      client,
      configVars,
      endpoint: "/customers",
    });

    const result = data.data.map<Element>((customer) => ({
      label: customer.name
        ? `${customer.firstname} ${customer.lastname}`
        : "No Name",
      key: util.types.toString(customer.id),
    }));

    return {
      result,
    };
  },
  inputs,
  examplePayload,
});

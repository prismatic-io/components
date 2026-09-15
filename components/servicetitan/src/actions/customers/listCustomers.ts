import { action, outputSchema } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { listCustomersExamplePayload } from "../../examplePayloads";
import { listCustomersInputs } from "../../inputs";
import { listCustomersOutputSchema } from "../../outputSchemas";
import type { Customer } from "../../types";
import { fetchAllRecords } from "../../util";
export const listCustomers = action({
  display: {
    label: "List Customers",
    description: "Retrieve a list of customers.",
  },
  inputs: listCustomersInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: listCustomersOutputSchema,
  }),
  performSafety: "notAllowed",
  perform: async (
    context,
    { connection, customQueryParams, includeTotal, pagination, sort, fetchAll },
  ) => {
    const client = createClient(connection, "crm", context.debug.enabled);
    if (fetchAll) {
      const data = await fetchAllRecords<Customer>(client, "/customers", {
        includeTotal,
        sort,
        ...customQueryParams,
      });
      return {
        data,
      };
    }
    const { data } = await client.get(`/customers`, {
      params: {
        includeTotal,
        page: pagination.page,
        pageSize: pagination.pageSize,
        sort,
        ...customQueryParams,
      },
    });
    return {
      data,
    };
  },
  examplePerform: async () => listCustomersExamplePayload,
  examplePayload: listCustomersExamplePayload,
});

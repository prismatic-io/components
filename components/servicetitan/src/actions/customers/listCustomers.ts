import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { listCustomersExamplePayload } from "../../examplePayloads";
import { listCustomersInputs } from "../../inputs";
import type { Customer } from "../../types";
import { fetchAllRecords } from "../../util";
export const listCustomers = action({
  display: {
    label: "List Customers",
    description: "Retrieve a list of Customers",
  },
  inputs: listCustomersInputs,
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
  examplePayload: listCustomersExamplePayload,
});

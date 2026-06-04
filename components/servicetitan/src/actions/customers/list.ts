import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { listCustomersResponse } from "../../examplePayloads";
import {
  connection,
  customQueryParams,
  fetchAll,
  includeTotal,
  page,
  pageSize,
  sort,
} from "../../inputs";
import type { Customer } from "../../interfaces";
import { fetchAllRecords } from "../../util";

export const listCustomers = action({
  display: {
    label: "List Customers",
    description: "Retrieve a list of Customers",
  },
  inputs: {
    connection,
    fetchAll,
    page,
    pageSize,
    sort,
    includeTotal,
    customQueryParams,
  },
  perform: async (
    context,
    {
      connection,
      customQueryParams,
      includeTotal,
      page,
      pageSize,
      sort,
      fetchAll,
    },
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
        page,
        pageSize,
        sort,
        ...customQueryParams,
      },
    });
    return {
      data,
    };
  },
  examplePayload: {
    data: listCustomersResponse,
  },
});

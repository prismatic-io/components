import { action } from "@prismatic-io/spectral";
import { getShopifyGraphQlClient } from "../../../client";
import { MAX_LIMIT } from "../../../constants";
import { listCustomersExamplePayload } from "../../../examplePayloads";
import { listCustomersInputs as inputs } from "../../../inputsGql";
import type { Customer } from "../../../types";
import { customerMapper, fetchData, paginationMapper } from "../../../util";
import listCustomersQuery from "../queries/customers/ListCustomers.gql";

export const listCustomersGql = action({
  display: {
    label: "List Customers",
    description: "Lists all customers.",
  },
  performSafety: "notAllowed",
  perform: async (
    context,
    { shopifyConnection, getAlldata, pagination = {} },
  ) => {
    const client = getShopifyGraphQlClient(
      shopifyConnection,
      undefined,
      context.debug.enabled,
      context.logger,
    );

    const data = await fetchData<Customer>(
      client,
      ["customers"],
      "customers",
      getAlldata,
      listCustomersQuery,
      {
        first: getAlldata ? MAX_LIMIT : pagination.limit,
        cursor: getAlldata ? undefined : pagination.endCursor,
      },
    );

    return {
      data: {
        data: {
          customers: data.customers.map(customerMapper),
        },
        ...paginationMapper(data.pageInfo),
      },
    };
  },
  inputs,
  examplePerform: async () => listCustomersExamplePayload.restMap,
  examplePayload: listCustomersExamplePayload.restMap,
});

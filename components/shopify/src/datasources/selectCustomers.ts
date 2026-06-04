import { dataSource, util } from "@prismatic-io/spectral";
import listCustomersQuery from "../actions/graphql/queries/customers/ListCustomersDataSource.gql";
import type { DataSourceRecord } from "../actions/interfaces/DataSourceRecord";
import { getShopifyGraphQlClient } from "../client";
import { MAX_LIMIT } from "../constants";
import { selectCustomersInputs as inputs } from "../inputsGql";
import { fetchData, getNumericId } from "../util";
export const selectCustomers = dataSource({
  display: {
    label: "Select Customers",
    description: "A picklist of all customers.",
  },
  perform: async (_context, { shopifyConnection }) => {
    const client = getShopifyGraphQlClient(shopifyConnection, undefined, false);

    const { customers } = await fetchData<DataSourceRecord>(
      client,
      ["customers"],
      "customers",
      true,
      listCustomersQuery,
      {
        first: MAX_LIMIT,
      },
    );

    const result = customers.map((record) => {
      const numericId = getNumericId(record.id);
      return {
        label: `${record.email} - ${numericId}`,
        key: util.types.toString(numericId),
      };
    });
    return { result };
  },
  inputs,
  dataSourceType: "picklist",
});

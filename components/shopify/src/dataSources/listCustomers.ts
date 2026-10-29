import { dataSource, util } from "@prismatic-io/spectral";
import listCustomersQuery from "../actions/graphql/queries/customers/ListCustomersDataSource.gql";
import { getShopifyGraphQlClient } from "../client";
import { MAX_LIMIT } from "../constants";
import { selectCustomersInputs } from "../inputs";
import type { DataSourceRecord } from "../types";
import { fetchData, getNumericId } from "../util";

export const listCustomers = dataSource({
  display: {
    label: "Select Customer",
    description: "Selects a customer from a list of all customers.",
  },
  perform: async (context, { shopifyConnection }) => {
    const client = getShopifyGraphQlClient(
      shopifyConnection,
      undefined,
      false,
      context.logger,
    );

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
  inputs: selectCustomersInputs,
  dataSourceType: "picklist",
});

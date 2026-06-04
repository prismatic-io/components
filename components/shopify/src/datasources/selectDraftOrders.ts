import { dataSource, util } from "@prismatic-io/spectral";
import listDraftOrdersQuery from "../actions/graphql/queries/draftOrders/ListDraftOrdersDataSource.gql";
import type { DataSourceRecord } from "../actions/interfaces/DataSourceRecord";
import { getShopifyGraphQlClient } from "../client";
import { MAX_LIMIT } from "../constants";
import { selectDraftOrdersInputs as inputs } from "../inputsGql";
import { fetchData, getNumericId } from "../util";

export const selectDraftOrders = dataSource({
  display: {
    label: "Select Draft Orders",
    description: "A picklist of all draft orders.",
  },
  perform: async (_context, { shopifyConnection }) => {
    const client = getShopifyGraphQlClient(shopifyConnection, undefined, false);

    const { draftOrders } = await fetchData<DataSourceRecord>(
      client,
      ["draftOrders"],
      "draftOrders",
      true,
      listDraftOrdersQuery,
      {
        first: MAX_LIMIT,
      },
    );

    const result = draftOrders.map((record) => {
      const numericId = getNumericId(record.id);
      return {
        label: record.name || `Draft Order ${numericId}`,
        key: util.types.toString(numericId),
      };
    });
    return { result };
  },
  inputs,
  dataSourceType: "picklist",
});

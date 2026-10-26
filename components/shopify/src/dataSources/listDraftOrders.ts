import { dataSource, util } from "@prismatic-io/spectral";
import listDraftOrdersQuery from "../actions/graphql/queries/draftOrders/ListDraftOrdersDataSource.gql";
import { getShopifyGraphQlClient } from "../client";
import { MAX_LIMIT } from "../constants";
import { selectDraftOrdersInputs } from "../inputs";
import type { DataSourceRecord } from "../types";
import { fetchData, getNumericId } from "../util";
export const listDraftOrders = dataSource({
  display: {
    label: "Select Draft Order",
    description: "Selects a draft order from a list of all draft orders.",
  },
  perform: async (context, { shopifyConnection }) => {
    const client = getShopifyGraphQlClient(
      shopifyConnection,
      undefined,
      false,
      context.logger,
    );
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
  inputs: selectDraftOrdersInputs,
  dataSourceType: "picklist",
});

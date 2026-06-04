import { dataSource, util } from "@prismatic-io/spectral";
import listCollectionsQuery from "../actions/graphql/queries/collections/ListCollectionsDataSource.gql";
import type { DataSourceRecord } from "../actions/interfaces/DataSourceRecord";
import { getShopifyGraphQlClient } from "../client";
import { MAX_LIMIT } from "../constants";
import { selectCollectionsInputs as inputs } from "../inputsGql";
import { fetchData, getNumericId } from "../util";

export const selectCollections = dataSource({
  display: {
    label: "Select Collections",
    description: "A picklist of all collections.",
  },
  perform: async (_context, { shopifyConnection }) => {
    const client = getShopifyGraphQlClient(shopifyConnection, undefined, false);

    const { collections } = await fetchData<DataSourceRecord>(
      client,
      ["collections"],
      "collections",
      true,
      listCollectionsQuery,
      {
        first: MAX_LIMIT,
      },
    );

    const result = collections.map((record) => {
      const numericId = getNumericId(record.id);
      return {
        label: record.title || `Collection ${numericId}`,
        key: util.types.toString(numericId),
      };
    });
    return { result };
  },
  inputs,
  dataSourceType: "picklist",
});

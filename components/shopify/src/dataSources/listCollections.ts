import { dataSource, util } from "@prismatic-io/spectral";
import listCollectionsQuery from "../actions/graphql/queries/collections/ListCollectionsDataSource.gql";
import { getShopifyGraphQlClient } from "../client";
import { MAX_LIMIT } from "../constants";
import { selectCollectionsInputs } from "../inputs";
import type { DataSourceRecord } from "../types";
import { fetchData, getNumericId } from "../util";
export const listCollections = dataSource({
  display: {
    label: "Select Collection",
    description: "Selects a collection from a list of all collections.",
  },
  perform: async (context, { shopifyConnection }) => {
    const client = getShopifyGraphQlClient(
      shopifyConnection,
      undefined,
      false,
      context.logger,
    );
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
  inputs: selectCollectionsInputs,
  dataSourceType: "picklist",
});

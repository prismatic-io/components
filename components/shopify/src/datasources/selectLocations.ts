import { dataSource, util } from "@prismatic-io/spectral";
import listLocationsQuery from "../actions/graphql/queries/locations/ListLocationsDataSource.gql";
import type { DataSourceRecord } from "../actions/interfaces/DataSourceRecord";
import { getShopifyGraphQlClient } from "../client";
import { MAX_LIMIT } from "../constants";
import { selectLocationsInputs as inputs } from "../inputsGql";
import { fetchData, getNumericId } from "../util";

export const selectLocations = dataSource({
  display: {
    label: "Select Locations",
    description: "A picklist of all locations.",
  },
  perform: async (_context, { shopifyConnection }) => {
    const client = getShopifyGraphQlClient(shopifyConnection, undefined, false);
    const { locations } = await fetchData<DataSourceRecord>(
      client,
      ["locations"],
      "locations",
      true,
      listLocationsQuery,
      {
        first: MAX_LIMIT,
      },
    );

    const result = locations.map((location) => {
      const numericId = getNumericId(location.id);
      return {
        label: `${location.name} - ${numericId}`,
        key: util.types.toString(numericId),
      };
    });
    return { result };
  },
  inputs,
  dataSourceType: "picklist",
});

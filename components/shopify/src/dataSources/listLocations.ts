import { dataSource, util } from "@prismatic-io/spectral";
import listLocationsQuery from "../actions/graphql/queries/locations/ListLocationsDataSource.gql";
import { getShopifyGraphQlClient } from "../client";
import { MAX_LIMIT } from "../constants";
import { selectLocationsInputs } from "../inputs";
import type { DataSourceRecord } from "../types";
import { fetchData, getNumericId } from "../util";

export const listLocations = dataSource({
  display: {
    label: "Select Location",
    description: "Selects a location from a list of all locations.",
  },
  perform: async (context, { shopifyConnection }) => {
    const client = getShopifyGraphQlClient(
      shopifyConnection,
      undefined,
      false,
      context.logger,
    );
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
  inputs: selectLocationsInputs,
  dataSourceType: "picklist",
});

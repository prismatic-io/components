import { dataSource, type Element } from "@prismatic-io/spectral";
import { createClient } from "../client";
import { locationDatasource } from "../examplePayloads/datasources";
import { connection } from "../inputs";
import type { Location } from "../interfaces/locations";
import { fetchAllData } from "../util";

export const selectLocation = dataSource({
  display: {
    label: "Select Location",
    description: "Select a Location from a dropdown menu.",
  },
  inputs: {
    connection,
  },
  perform: async (_context, { connection }) => {
    const client = createClient(connection);
    const { data } = await fetchAllData<Location>(client, "locations", {}, true);

    const objects = data
      .sort((a, b) => (a.id < b.id ? -1 : 1))
      .map<Element>((location) => ({
        key: location.id,
        label: location.name,
      }));

    return { result: objects };
  },
  dataSourceType: "picklist",
  examplePayload: {
    result: locationDatasource,
  },
});

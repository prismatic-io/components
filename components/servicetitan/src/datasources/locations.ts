import { dataSource, type Element } from "@prismatic-io/spectral";
import { createClient } from "../client";
import { locationDatasource } from "../examplePayloads";
import { connection } from "../inputs";
import type { Location } from "../interfaces";

export const selectLocation = dataSource({
  display: {
    label: "Select Location",
    description:
      "Select a Location from a dropdown menu (up to 10,000 Locations)",
  },
  inputs: {
    connection,
  },
  perform: async (_context, { connection }) => {
    const client = createClient(connection, "crm");
    let locations: Location[] = [];
    let cursor = false;
    let page = 1;

    do {
      const { data } = await client.get(`/locations`, {
        params: {
          includeTotal: true,
          page,
          pageSize: 1000,
        },
      });
      locations = [...locations, ...data.data];
      cursor = data.hasMore;
      page++;
    } while (cursor && page < 10);

    
    const objects = locations
      .sort((a, b) => (a.id < b.id ? -1 : 1))
      .map<Element>((location) => ({
        key: location.id.toString(),
        label: `${location.name} (ID: ${location.id})`,
      }));

    return { result: objects };
  },
  dataSourceType: "picklist",
  examplePayload: {
    result: locationDatasource,
  },
});

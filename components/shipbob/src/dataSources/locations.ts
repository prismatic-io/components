import { dataSource, type Element } from "@prismatic-io/spectral";
import { createClient } from "../client";
import { connectionInput, version } from "../inputs";

interface Location {
  id: number;
  name: string;
}

export const locations = dataSource({
  display: {
    label: "Fetch Locations",
    description: "Fetch an array of locations",
  },
  inputs: {
    connection: connectionInput,
    version,
  },
  perform: async (_context, { connection, version }) => {
    const client = createClient(connection, version, false);
    const { data } = await client.get<Location[]>("/location");
    const result = data.map<Element>((location) => ({
      label: location.name,
      key: location.id.toString(),
    }));
    return { result };
  },
  dataSourceType: "picklist",
  examplePayload: {
    result: [
      { label: "Cicero (IL)", key: "0" },
      { label: "Other", key: "47012" },
    ],
  },
});

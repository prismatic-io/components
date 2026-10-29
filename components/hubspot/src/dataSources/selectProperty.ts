import { dataSource, type Element } from "@prismatic-io/spectral";
import { getHubspotClient } from "../client";
import { hubspotPaths } from "../constants";
import { selectPropertyExamplePayload } from "../examplePayloads";
import { selectPropertyInputs } from "../inputs";
import type { Property } from "../types";

export const selectProperty = dataSource({
  display: {
    label: "Select Property",
    description: "Select a property from the list of properties.",
  },
  inputs: selectPropertyInputs,
  perform: async (_context, { connection, objectType }) => {
    const client = getHubspotClient({
      hubspotConnection: connection,
      debugRequest: false,
    });
    const { data } = await client.get<{ results: Property[] }>(
      hubspotPaths.properties(objectType),
    );

    const result = data.results.map<Element>((property) => ({
      label: `${property.label} (${property.name})`,
      key: property.name,
    }));
    return { result };
  },
  examplePayload: selectPropertyExamplePayload,
  dataSourceType: "picklist",
});

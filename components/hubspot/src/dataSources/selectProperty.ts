import { dataSource, type Element } from "@prismatic-io/spectral";
import { getHubspotClient } from "../client";
import { selectPropertyInputs } from "../inputs";
import type { Property } from "../types/Property";

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
    const { data } = await client.get<{ results: Property[] }>(`/crm/v3/properties/${objectType}`);

    const result = data.results.map<Element>((property) => ({
      label: `${property.label} (${property.name})`,
      key: property.name,
    }));
    return { result };
  },
  dataSourceType: "picklist",
});

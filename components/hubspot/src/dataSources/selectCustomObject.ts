import { dataSource, type Element } from "@prismatic-io/spectral";
import { getHubspotClient } from "../client";
import { selectCustomObjectInputs } from "../inputs";

interface CustomObjectSchema {
  objectTypeId?: string;
  name?: string;
  labels?: {
    singular?: string;
    plural?: string;
  };
}

export const selectCustomObject = dataSource({
  display: {
    label: "Select Custom Object",
    description: "Select a custom object from the list of custom objects.",
  },
  inputs: selectCustomObjectInputs,
  perform: async (context, { connection }) => {
    const client = getHubspotClient({
      hubspotConnection: connection,
      debugRequest: false,
    });

    const { data } = await client.get("/crm/v3/schemas");

    const result = ((data.results || []) as CustomObjectSchema[]).map<Element>((item) => ({
      label: item.labels?.singular || item.name || "",
      key: item.objectTypeId || "",
    }));
    return { result };
  },
  dataSourceType: "picklist",
});

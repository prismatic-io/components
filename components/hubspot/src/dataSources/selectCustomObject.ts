import { dataSource, type Element } from "@prismatic-io/spectral";
import { getHubspotClient } from "../client";
import { hubspotPaths } from "../constants";
import { selectCustomObjectExamplePayload } from "../examplePayloads";
import { selectCustomObjectInputs } from "../inputs";
import type { CustomObjectSchema } from "../types";
export const selectCustomObject = dataSource({
  display: {
    label: "Select Custom Object",
    description: "Select a custom object from the list of custom objects.",
  },
  inputs: selectCustomObjectInputs,
  perform: async (_context, { connection }) => {
    const client = getHubspotClient({
      hubspotConnection: connection,
      debugRequest: false,
    });
    const { data } = await client.get(hubspotPaths.schemas());
    const result = ((data.results || []) as CustomObjectSchema[]).map<Element>(
      (item) => ({
        label: item.labels?.singular || item.name || "",
        key: item.objectTypeId || "",
      }),
    );
    return { result };
  },
  examplePayload: selectCustomObjectExamplePayload,
  dataSourceType: "picklist",
});

import { dataSource, type Element } from "@prismatic-io/spectral";
import { getHubspotClient } from "../client";
import { hubspotPaths, STANDARD_OBJECT_TYPES } from "../constants";
import { selectObjectTypeExamplePayload } from "../examplePayloads";
import { selectObjectTypeInputs } from "../inputs";
import type { CustomObjectSchema } from "../types";
export const selectObjectType = dataSource({
  display: {
    label: "Select Object Type",
    description:
      "Select an object type from the list of standard and custom object types.",
  },
  inputs: selectObjectTypeInputs,
  perform: async (_context, { connection }) => {
    const client = getHubspotClient({
      hubspotConnection: connection,
      debugRequest: false,
    });
    const { data } = await client.get(hubspotPaths.schemas());
    const customObjects = ((data.results || []) as CustomObjectSchema[])
      .filter((item) => item.objectTypeId)
      .map<Element>((item) => ({
        label: item.labels?.plural || item.labels?.singular || item.name || "",
        key: (item.objectTypeId ?? "").toString(),
      }))
      .sort((a, b) => (a.label ?? "").localeCompare(b.label ?? ""));
    const standardObjects = STANDARD_OBJECT_TYPES.map<Element>(
      ({ label, key }) => ({
        label,
        key,
      }),
    );
    return { result: [...standardObjects, ...customObjects] };
  },
  examplePayload: selectObjectTypeExamplePayload,
  dataSourceType: "picklist",
});

import { dataSource, type Element } from "@prismatic-io/spectral";
import { getHubspotClient } from "../client";
import { hubspotPaths } from "../constants";
import { selectAssociationTypeExamplePayload } from "../examplePayloads";
import { selectAssociationTypeInputs } from "../inputs";
import type { AssociationTypeDefinition } from "../types";
import { resultsOf } from "../util";
export const selectAssociationType = dataSource({
  display: {
    label: "Select Association Type",
    description:
      "Select an association type from the list of association types for an object pair.",
  },
  inputs: selectAssociationTypeInputs,
  perform: async (_context, { connection, fromObjectType, toObjectType }) => {
    const client = getHubspotClient({
      hubspotConnection: connection,
      debugRequest: false,
    });
    const { data } = await client.get(
      hubspotPaths.associations(fromObjectType, toObjectType, "/labels"),
    );
    const types = resultsOf(data) as AssociationTypeDefinition[];
    const result = types
      .map<Element>(({ typeId, label }) => ({
        label:
          typeof label === "string" && label.trim() ? label : `Type ${typeId}`,
        key: String(typeId),
      }))
      .sort((a, b) => (a.label ?? "").localeCompare(b.label ?? ""));
    return { result };
  },
  examplePayload: selectAssociationTypeExamplePayload,
  dataSourceType: "picklist",
});

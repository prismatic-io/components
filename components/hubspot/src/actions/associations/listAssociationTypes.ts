import { action, outputSchema } from "@prismatic-io/spectral";
import { listAssociationTypesOutputSchema } from "../../outputSchemas";
import { getHubspotClient } from "../../client";
import { listAssociationTypesExamplePayload } from "../../examplePayloads";
import { listAssociationTypesInputs } from "../../inputs";
import { hubspotPaths } from "../../constants";
import { mapAssociationTypes } from "../../util";

export const listAssociationTypes = action({
  display: {
    label: "List Association Types",
    description:
      "Retrieve a list of all association types available between two objects.",
  },
  performSafety: "safe",
  perform: async (context, params) => {
    const debugRequest = context.debug.enabled;
    const client = getHubspotClient({
      hubspotConnection: params.hubspotConnection,
      timeout: params.timeout,
      debugRequest,
    });
    const { data } = await client.get(
      hubspotPaths.associations(
        params.fromObjectType,
        params.toObjectType,
        "/labels",
      ),
    );

    return { data: mapAssociationTypes(data) };
  },
  inputs: listAssociationTypesInputs,
  examplePayload: listAssociationTypesExamplePayload,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: listAssociationTypesOutputSchema,
  }),
});

import { action, outputSchema } from "@prismatic-io/spectral";
import { listAssociationTypesOutputSchema } from "../../outputSchemas";
import { getHubspotClient } from "../../client";
import { listAssociationTypesExamplePayload } from "../../examplePayloads";
import { listAssociationTypesInputs } from "../../inputs";
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
      `/crm/v3/associations/${params.fromObjectType}/${params.toObjectType}/types`,
    );
    return { data };
  },
  inputs: listAssociationTypesInputs,
  examplePayload: listAssociationTypesExamplePayload,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: listAssociationTypesOutputSchema,
  }),
});

import { action, outputSchema } from "@prismatic-io/spectral";
import { listPropertiesOutputSchema } from "../../outputSchemas";
import { getHubspotClient } from "../../client";
import { listPropertiesExamplePayload } from "../../examplePayloads";
import { listPropertiesInputs } from "../../inputs";
import { hubspotPaths } from "../../constants";
export const listProperties = action({
  display: {
    label: "List Properties",
    description: "Retrieve a list of all configured object properties.",
  },
  performSafety: "safe",
  perform: async (context, { timeout, objectType, hubspotConnection }) => {
    const debugRequest = context.debug.enabled;
    const client = getHubspotClient({
      hubspotConnection,
      timeout,
      debugRequest,
    });
    const { data } = await client.get(hubspotPaths.properties(objectType));
    return { data };
  },
  inputs: listPropertiesInputs,
  examplePayload: listPropertiesExamplePayload,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: listPropertiesOutputSchema,
  }),
});
export default listProperties;

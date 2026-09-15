import { action, outputSchema } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { getLocationExamplePayload } from "../../examplePayloads";
import { getLocationInputs } from "../../inputs";
import { getLocationOutputSchema } from "../../outputSchemas";
export const getLocation = action({
  display: {
    label: "Get Location",
    description: "Retrieve a location by ID.",
  },
  inputs: getLocationInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: getLocationOutputSchema,
  }),
  performSafety: "safe",
  perform: async (context, { connection, locationId }) => {
    const client = createClient(connection, "crm", context.debug.enabled);
    const { data } = await client.get(`/locations/${locationId}`);
    return {
      data,
    };
  },
  examplePayload: getLocationExamplePayload,
});

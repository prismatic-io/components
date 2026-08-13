import { action, outputSchema } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { getLocationResponse } from "../../examplePayloads/locations";
import { connection, locationId } from "../../inputs";
import { getLocationOutputSchema } from "../../outputSchemas";
export const getLocation = action({
  display: {
    label: "Get Location",
    description: "Retrieve a location by ID",
  },
  inputs: {
    locationId,
    connection,
  },
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: getLocationOutputSchema,
  }),
  performSafety: "safe",
  perform: async (context, { connection, locationId }) => {
    const client = createClient(connection, context.debug.enabled);
    const { data } = await client.get(`/locations/${locationId}`);
    return {
      data,
    };
  },
  examplePayload: {
    data: getLocationResponse,
  },
});

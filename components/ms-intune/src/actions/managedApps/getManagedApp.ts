import { action, outputSchema } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { ENDPOINTS } from "../../constants";
import { getManagedAppExamplePayload } from "../../examplePayloads";
import { getManagedAppInputs } from "../../inputs";
import { getManagedAppOutputSchema } from "../../outputSchemas";

export const getManagedApp = action({
  display: {
    label: "Get Managed App",
    description: "Read properties and relationships of an App object.",
  },
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: getManagedAppOutputSchema,
  }),
  performSafety: "safe",
  perform: async (context, { connection, appId }) => {
    const client = createClient(connection, context.debug.enabled);
    const { data } = await client.get(`${ENDPOINTS.MOBILE_APPS}/${appId}`);
    return {
      data,
    };
  },
  inputs: getManagedAppInputs,
  examplePayload: getManagedAppExamplePayload,
});

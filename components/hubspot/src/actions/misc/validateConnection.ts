import { action, outputSchema } from "@prismatic-io/spectral";
import { validateConnectionOutputSchema } from "../../outputSchemas";
import { getHubspotClient } from "../../client";
import { validateConnectionExamplePayload } from "../../examplePayloads";
import { validateConnectionInputs } from "../../inputs";
export const validateConnection = action({
  display: {
    label: "Validate Connection",
    description:
      "Returns a boolean value that specifies whether the provided Connection is valid.",
  },
  inputs: validateConnectionInputs,
  performSafety: "safe",
  perform: async (context, { timeout, hubspotConnection }) => {
    try {
      const debugRequest = context.debug.enabled;
      const client = getHubspotClient({
        hubspotConnection,
        timeout,
        debugRequest,
      });
      await client.get("/integrations/v1/me");
      return {
        data: true,
      };
    } catch {
      return { data: false };
    }
  },
  examplePayload: validateConnectionExamplePayload,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: validateConnectionOutputSchema,
  }),
});
export default validateConnection;

import { action, outputSchema } from "@prismatic-io/spectral";
import { getCurrentUserOutputSchema } from "../../outputSchemas";
import { getCalendlyClient } from "../../client";
import { getCurrentUserInputs } from "../../inputs";
import { getCurrentUserExamplePayload } from "../../examplePayloads";
export const getCurrentUser = action({
  display: {
    label: "Get Current User",
    description:
      "Returns basic information about the authenticated user account.",
  },
  performSafety: "safe",
  perform: async (context, { connection }) => {
    const client = getCalendlyClient(connection, context.debug.enabled);
    const { data } = await client.get("/users/me");
    return { data };
  },
  inputs: getCurrentUserInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: getCurrentUserOutputSchema,
  }),
  examplePayload: getCurrentUserExamplePayload,
});

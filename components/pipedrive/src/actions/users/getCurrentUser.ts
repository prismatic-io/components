import { action, outputSchema } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { getCurrentUserInputs } from "../../inputs";
import { getCurrentUserExamplePayload } from "../../examplePayloads";
import { getCurrentUserOutputSchema } from "../../outputSchemas";
export const getCurrentUser = action({
  display: {
    label: "Get Current User",
    description: "Gets current user data.",
  },
  performSafety: "safe",
  perform: async (context, { connection }) => {
    const client = createClient(connection, context.debug.enabled);
    const { data } = await client.get("/users/me");
    return { data };
  },
  inputs: getCurrentUserInputs,
  examplePayload: getCurrentUserExamplePayload,
  examplePerform: async () => getCurrentUserExamplePayload,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: getCurrentUserOutputSchema,
  }),
});

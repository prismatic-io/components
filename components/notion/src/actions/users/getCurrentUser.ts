import { action, outputSchema } from "@prismatic-io/spectral";
import { getCurrentUserOutputSchema } from "../../outputSchemas";
import { createClient } from "../../client";
import { getCurrentUserExamplePayload } from "../../examplePayloads";
import { getCurrentUserInputs } from "../../inputs";
export const getCurrentUser = action({
  display: {
    label: "Get Current User",
    description: "Get the currently logged in user",
  },
  inputs: getCurrentUserInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: getCurrentUserOutputSchema,
  }),
  performSafety: "safe",
  perform: async (context, params) => {
    const client = createClient(params.connection, context.debug.enabled);
    const { data } = await client.get("/users/me");
    return { data };
  },
  examplePayload: getCurrentUserExamplePayload,
});

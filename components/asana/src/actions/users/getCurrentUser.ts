import { action, outputSchema } from "@prismatic-io/spectral";
import { createAsanaClient } from "../../client";
import { getCurrentUserExamplePayload } from "../../examplePayloads";
import { getCurrentUserInputs } from "../../inputs";
import { userResponseSchema } from "../../outputSchemas";
export const getCurrentUser = action({
  display: {
    label: "Get Current User",
    description: "Get information about the currently authenticated user.",
  },
  performSafety: "safe",
  perform: async (context, params) => {
    const client = await createAsanaClient(
      params.asanaConnection,
      context.debug.enabled,
    );
    const { data } = await client.get("/users/me");
    return { data };
  },
  inputs: getCurrentUserInputs,
  examplePayload: getCurrentUserExamplePayload,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: userResponseSchema,
  }),
});

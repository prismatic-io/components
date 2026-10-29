import { action, outputSchema } from "@prismatic-io/spectral";
import { createGitlabClient } from "../../client";
import { getCurrentUserExamplePayload } from "../../examplePayloads";
import { getCurrentUserInputs } from "../../inputs";
import { getCurrentUserOutputSchema } from "../../outputSchemas";

export const getCurrentUser = action({
  display: {
    label: "Get Current User",
    description:
      "Retrieve the user the connection authenticates as. Useful for verifying a connection.",
  },
  inputs: getCurrentUserInputs,
  performSafety: "safe",
  perform: async (context, { connection }) => {
    const client = createGitlabClient(
      connection,
      context.debug.enabled && context.logger,
    );
    const { data } = await client.get("/user");
    return { data };
  },
  examplePayload: getCurrentUserExamplePayload,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: getCurrentUserOutputSchema,
  }),
});

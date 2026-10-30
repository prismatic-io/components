import { action, outputSchema } from "@prismatic-io/spectral";
import { createV3Client } from "../../client";
import { getCurrentUserExamplePayload } from "../../examplePayloads";
import { getCurrentUserInputs } from "../../inputs";
import { getCurrentUserOutputSchema } from "../../outputSchemas";

export const getCurrentUser = action({
  display: {
    label: "Get Current User",
    description: "Get the information and metadata of the current user.",
  },
  performSafety: "safe",
  perform: async (context, params) => {
    const client = await createV3Client(
      params.jiraConnection,
      context.debug.enabled,
    );
    const { data } = await client.get("/myself");
    return { data };
  },
  inputs: getCurrentUserInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: getCurrentUserOutputSchema,
  }),
  examplePayload: getCurrentUserExamplePayload,
});

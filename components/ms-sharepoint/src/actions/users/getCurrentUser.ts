import { action, outputSchema } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { getCurrentUserExamplePayload } from "../../examplePayloads";
import { getCurrentUserInputs } from "../../inputs";
import { getCurrentUserOutputSchema } from "../../outputSchemas";

export const getCurrentUser = action({
  display: {
    label: "Get Current User",
    description: "Get the information and metadata of the user that is currently logged in.",
  },
  performSafety: "safe",
  perform: async ({ debug: { enabled: debug } }, params) => {
    const client = await createClient(params.connection, debug);
    const { data } = await client.get("/me");
    return { data };
  },
  inputs: getCurrentUserInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: getCurrentUserOutputSchema,
  }),
  examplePayload: getCurrentUserExamplePayload,
});

import { action, outputSchema } from "@prismatic-io/spectral";
import { createAuthorizedClient } from "../../client";
import { getCurrentUserExamplePayload } from "../../examplePayloads";
import { getCurrentUserInputs } from "../../inputs";
import { getCurrentUserOutputSchema } from "../../outputSchemas";
export const getCurrentUser = action({
  display: {
    label: "Get Current User",
    description:
      "Get the information and metadata of the user that is currently logged in.",
  },
  perform: async (context, { boxConnection }) => {
    const client = createAuthorizedClient({ boxConnection });
    const result = await client.users.getUserMe();
    return { data: result.rawData };
  },
  inputs: getCurrentUserInputs,
  performSafety: "safe",
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: getCurrentUserOutputSchema,
  }),
  examplePayload: getCurrentUserExamplePayload,
});

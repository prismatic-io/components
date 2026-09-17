import { action, outputSchema } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { getCurrentUserInputs } from "../../inputs";
import { getCurrentUserOutputSchema } from "../../outputSchemas";
import { getCurrentUserExamplePayload } from "../../examplePayloads";
export const getCurrentUser = action({
  display: {
    label: "Get Current User",
    description:
      "Get the information and metadata of the user that is currently logged in",
  },
  performSafety: "safe",
  perform: async (_context, params) => {
    const drive = createClient(params.connection);
    const {
      data: { user },
    } = await drive.about.get({ fields: "user" });
    return { data: user };
  },
  inputs: getCurrentUserInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: getCurrentUserOutputSchema,
  }),
  examplePayload: getCurrentUserExamplePayload,
});

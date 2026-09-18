import { action, outputSchema } from "@prismatic-io/spectral";
import { createAuthorizedClient } from "../../auth";
import { getCurrentAccountExamplePayload } from "../../examplePayloads";
import { getCurrentAccountInputs } from "../../inputs";
import { getCurrentAccountOutputSchema } from "../../outputSchemas";
import { handleDropboxError } from "../../util";
export const getCurrentAccount = action({
  display: {
    label: "Get Current Account",
    description: "Get information about the currently authenticated user",
  },
  performSafety: "safe",
  perform: async (_context, { dropboxConnection }) => {
    const dbx = createAuthorizedClient(dropboxConnection);
    try {
      const { result } = await dbx.usersGetCurrentAccount();
      return { data: result };
    } catch (err) {
      handleDropboxError(err);
    }
  },
  inputs: getCurrentAccountInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: getCurrentAccountOutputSchema,
  }),
  examplePayload: {
    data: getCurrentAccountExamplePayload,
  },
});

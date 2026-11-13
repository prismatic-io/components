import { action, outputSchema } from "@prismatic-io/spectral";
import { getOneDriveClient } from "../../client";
import { handleErrors } from "../../errors";
import { searchUserExamplePayload } from "../../examplePayloads";
import { searchUserInputs } from "../../inputs";
import { searchUserOutputSchema } from "../../outputSchemas";

export const searchUser = action({
  display: {
    label: "Search Users",
    description: "Finds the information and metadata of an existing user.",
  },
  performSafety: "safe",
  perform: async (context, { connection, userId }) => {
    const client = getOneDriveClient(connection, context.debug.enabled);

    return {
      data: await handleErrors(client.get(`/users/${userId}`)),
    };
  },
  inputs: searchUserInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: searchUserOutputSchema,
  }),
  examplePayload: searchUserExamplePayload,
});

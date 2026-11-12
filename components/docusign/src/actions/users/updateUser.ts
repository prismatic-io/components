import { action, outputSchema } from "@prismatic-io/spectral";
import { updateUserOutputSchema } from "../../outputSchemas";
import { getDocuSignClient } from "../../client";
import { updateUserInputs } from "../../inputs";
import { updateUserExamplePayload } from "../../examplePayloads";

export const updateUser = action({
  display: {
    label: "Update User",
    description:
      "To update user information for a specific user, submit a Users object with updated field values in the request body of this operation.",
  },
  performSafety: "notAllowed",
  perform: async (context, { connection, jsonInput, userId }) => {
    const client = await getDocuSignClient(
      connection,
      true,
      context.debug.enabled,
    );
    const { data } = await client.put(`/users/${userId}`, jsonInput);
    return { data };
  },
  examplePerform: async () => updateUserExamplePayload,
  inputs: updateUserInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: updateUserOutputSchema,
  }),
  examplePayload: updateUserExamplePayload,
});

import { action, outputSchema } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { deleteUserExamplePayload } from "../../examplePayloads";
import { deleteUserInputs } from "../../inputs";
import { deleteUserOutputSchema } from "../../outputSchemas";
export const deleteUser = action({
  display: {
    label: "Delete User",
    description: "Deletes a user.",
  },
  inputs: deleteUserInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: deleteUserOutputSchema,
  }),
  performSafety: "notAllowed",
  perform: async (context, { connection, userId }) => {
    const client = createClient(connection, context.debug.enabled);
    const data = await client.post("/users/delete", { userID: userId });
    return { data };
  },
  examplePerform: async (): Promise<{
    data: unknown;
  }> => deleteUserExamplePayload,
  examplePayload: deleteUserExamplePayload,
});

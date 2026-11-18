import { action, outputSchema } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { deleteUserExamplePayload as examplePayload } from "../../examplePayloads";
import { deleteUserInputs as inputs } from "../../inputs/user";
import { deleteUserOutputSchema } from "../../outputSchemas";

export const deleteUser = action({
  display: {
    label: "Delete User",
    description: "Deletes a user.",
  },
  performSafety: "notAllowed",
  perform: async (context, { connection, userId }) => {
    const client = createClient(connection, context.debug.enabled);
    await client.delete(`/users/${userId}`);
    return {
      data: {
        success: true,
        id: userId,
        message: "User deleted successfully",
      },
    };
  },
  examplePerform: async () => examplePayload,
  inputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: deleteUserOutputSchema,
  }),
  examplePayload,
});

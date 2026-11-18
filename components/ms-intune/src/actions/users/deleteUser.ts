import { action, outputSchema } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { ENDPOINTS } from "../../constants";
import { deleteUserExamplePayload } from "../../examplePayloads";
import { deleteUserInputs } from "../../inputs";
import { deleteUserOutputSchema } from "../../outputSchemas";

export const deleteUser = action({
  display: {
    label: "Delete User",
    description: "Deletes a User.",
  },
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: deleteUserOutputSchema,
  }),
  performSafety: "notAllowed",
  perform: async (context, { connection, userId }) => {
    const client = createClient(connection, context.debug.enabled);
    await client.delete(`${ENDPOINTS.USERS}/${userId}`);
    return {
      data: {
        success: true,
        id: userId,
        message: "User deleted successfully.",
      },
    };
  },
  examplePerform: async () => deleteUserExamplePayload,
  inputs: deleteUserInputs,
  examplePayload: deleteUserExamplePayload,
});

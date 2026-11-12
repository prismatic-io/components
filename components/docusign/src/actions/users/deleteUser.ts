import { action, outputSchema } from "@prismatic-io/spectral";
import { deleteUserOutputSchema } from "../../outputSchemas";
import { getDocuSignClient } from "../../client";
import { deleteUserInputs } from "../../inputs";
import { deleteUserExamplePayload } from "../../examplePayloads";

export const deleteUser = action({
  display: {
    label: "Delete User",
    description:
      "Closes one or more users in the account, preventing them from accessing account features.",
  },
  performSafety: "notAllowed",
  perform: async (context, { connection, userIds, deleteParam }) => {
    const client = await getDocuSignClient(
      connection,
      true,
      context.debug.enabled,
    );
    const { data } = await client.delete(`/users`, {
      data: { users: userIds },
      params: {
        delete: deleteParam || undefined,
      },
    });
    return { data };
  },
  examplePerform: async () => deleteUserExamplePayload,
  inputs: deleteUserInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: deleteUserOutputSchema,
  }),
  examplePayload: deleteUserExamplePayload,
});

import { action } from "@prismatic-io/spectral";
import { getDomoClient } from "../../client";
import { deleteUserInputs } from "../../inputs";
import { deleteUserExamplePayload } from "../../examplePayloads";

export const deleteUser = action({
  display: {
    label: "Delete User",
    description: "Permanently deletes a user from a Domo instance.",
  },
  examplePayload: deleteUserExamplePayload,
  perform: async (context, { connection, userId }) => {
    const client = await getDomoClient(connection, context.debug.enabled);
    const { data } = await client.delete(`/users/${userId}`);
    return { data };
  },
  inputs: deleteUserInputs,
});

export default { deleteUser };

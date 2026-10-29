import { action } from "@prismatic-io/spectral";
import { getDomoClient } from "../../client";
import { deleteUserExamplePayload } from "../../examplePayloads";
import { deleteUserInputs } from "../../inputs";

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

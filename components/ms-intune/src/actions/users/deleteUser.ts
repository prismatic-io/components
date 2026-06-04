import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { connection } from "../../inputs/general";
import deleteUserInputs from "../../inputs/users/deleteUserInputs";

export const deleteUser = action({
  display: {
    label: "Delete User",
    description: "Deletes a User.",
  },
  perform: async (context, { connection, userId }) => {
    const client = createClient(connection, context.debug.enabled);
    const { data } = await client.delete(`/users/${userId}`);
    return {
      data,
    };
  },
  inputs: {
    connection,
    ...deleteUserInputs,
  },
  examplePayload: { data: {} },
});

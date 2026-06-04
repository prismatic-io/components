import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { deleteUserExamplePayload } from "../../examplePayloads/users";
import { deactivateUserInputs } from "../../inputs/users";

export const deleteUser = action({
  display: {
    label: "Delete User",
    description: "Delete a user by ID or login.",
  },
  inputs: deactivateUserInputs,
  perform: async (context, { connection, id }) => {
    const client = await createClient(connection, context.debug.enabled);
    await client.delete(`/users/${encodeURIComponent(id)}`);

    return {
      data: {
        id,
        status: "DELETED",
      },
    };
  },
  examplePayload: deleteUserExamplePayload,
});

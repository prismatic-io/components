import { action } from "@prismatic-io/spectral";
import { deleteUserInputs } from "../../inputs/users";
import { createClient } from "../../client";
import { NO_CONTENT_RESPONSE } from "../../constants";

export const deleteUser = action({
  display: {
    label: "Delete User",
    description: "Deletes a user.",
  },
  perform: async (
    context,
    { connection, userId, isPermanentDelete },
  ) => {
    const client = createClient(connection, context.debug.enabled);
    await client.delete(`/users/${userId}`, {
      params: {
        isPermanentDelete,
      },
    });

    return {
      data: NO_CONTENT_RESPONSE,
    };
  },
  inputs: deleteUserInputs,
  examplePayload: { data: NO_CONTENT_RESPONSE },
});

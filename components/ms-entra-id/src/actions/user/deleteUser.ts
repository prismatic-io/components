import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { SUCCESS_RESPONSE } from "../../constants";
import { emptyExamplePayload as examplePayload } from "../../examplePayloads";
import { deleteUserInputs as inputs } from "../../inputs/user";

export const deleteUser = action({
  display: {
    label: "Delete User",
    description: "Deletes a user.",
  },
  perform: async (context, { connection, userId }) => {
    const client = createClient(connection, context.debug.enabled);
    await client.delete(`/users/${userId}`);
    return {
      data: SUCCESS_RESPONSE,
    };
  },
  inputs,
  examplePayload,
});

import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { ENDPOINTS } from "../../constants";
import { deleteUserExamplePayload } from "../../examplePayloads";
import { deleteUserInputs } from "../../inputs";
export const deleteUser = action({
  display: {
    label: "Delete User",
    description: "Deletes a User.",
  },
  perform: async (context, { connection, userId }) => {
    const client = createClient(connection, context.debug.enabled);
    const { data } = await client.delete(`${ENDPOINTS.USERS}/${userId}`);
    return {
      data,
    };
  },
  inputs: deleteUserInputs,
  examplePayload: deleteUserExamplePayload,
});

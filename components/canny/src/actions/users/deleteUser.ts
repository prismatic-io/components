import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { deleteUserExamplePayload } from "../../examplePayloads";
import { deleteUserInputs } from "../../inputs";

export const deleteUser = action({
  display: {
    label: "Delete User",
    description: "Deletes a user.",
  },
  inputs: deleteUserInputs,
  perform: async (context, { connection, userId }) => {
    const client = createClient(connection, context.debug.enabled);
    const data = await client.post("/users/delete", { userID: userId });
    return { data };
  },
  examplePayload: deleteUserExamplePayload,
});

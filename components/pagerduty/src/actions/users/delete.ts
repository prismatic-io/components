import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { NO_RESPONSE_SUCCESSFULL_PAYLOAD } from "../../examplePayloads";
import { connectionInput, userId } from "../../inputs";

export const deleteUser = action({
  display: {
    label: "Delete User",
    description: "Delete a user by ID.",
  },
  perform: async (context, { connection, id }) => {
    const client = createClient(connection, context.debug.enabled);
    const { data } = await client.delete(`/users/${id}`);
    return { data };
  },
  inputs: {
    connection: connectionInput,
    id: userId,
  },
  examplePayload: NO_RESPONSE_SUCCESSFULL_PAYLOAD,
});

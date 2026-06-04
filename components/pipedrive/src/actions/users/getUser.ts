import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { connectionInput, userIdInput } from "../../inputs";

export const getUser = action({
  display: {
    label: "Get User",
    description: "Gets one user by ID.",
  },
  perform: async (context, { connection, id }) => {
    const client = createClient(connection, context.debug.enabled);
    const { data } = await client.get(`/users/${id}`);
    return { data };
  },
  inputs: {
    connection: connectionInput,
    id: userIdInput,
  },
});

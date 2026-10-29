import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { connection, id } from "../../inputs";

export const deleteUser = action({
  display: {
    label: "Delete User",
    description: "Remove an existing user",
  },
  inputs: {
    id: {
      ...id,
      dataSource: "selectUser",
    },
    connection,
  },
  perform: async (context, { connection, id }) => {
    const client = createClient(connection, context.debug.enabled);
    const { data } = await client.delete(`/users/${id}`);
    return { data };
  },
});

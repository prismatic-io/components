import { action } from "@prismatic-io/spectral";
import { listUsersInputs } from "../../inputs/users";
import { createClient } from "../../client";
import { listUsersExamplePayload } from "../../examplePayloads/users";

export const listUsers = action({
  display: {
    label: "List Users",
    description: "Retrieves all users with given filter criteria.",
  },
  perform: async (
    context,
    { connection, permissions, fullList, userEmail, userName },
  ) => {
    const client = createClient(connection, context.debug.enabled);
    const { data } = await client.get("/users", {
      params: {
        full_list: fullList,
        email: userEmail,
        name: userName,
        permissions,
      },
    });

    return {
      data,
    };
  },
  inputs: listUsersInputs,
  examplePayload: listUsersExamplePayload,
});

import { action } from "@prismatic-io/spectral";
import { getDocuSignClient } from "../client";
import { connection, userIds, deleteParam } from "../inputs";

export const deleteUser = action({
  display: {
    label: "Delete User",
    description:
      "Closes one or more users in the account, preventing them from accessing account features.",
  },
  perform: async (context, { connection, userIds, deleteParam }) => {
    const client = await getDocuSignClient(
      connection,
      true,
      context.debug.enabled,
    );
    const { data } = await client.delete(`/users`, {
      data: { users: userIds },
      params: {
        delete: deleteParam || undefined,
      },
    });
    return { data };
  },
  inputs: {
    connection,
    userIds,
    deleteParam,
  },
});

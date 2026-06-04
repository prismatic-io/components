import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { connectionInput, userIdInput } from "../../inputs";

export const getUserPermissions = action({
  display: {
    label: "Get User Permissions",
    description: "Lists user permissions.",
  },
  perform: async (context, { connection, id }) => {
    const client = createClient(connection, context.debug.enabled);
    const { data } = await client.get(`/users/${id}/permissions`);
    return { data };
  },
  inputs: {
    connection: connectionInput,
    id: userIdInput,
  },
});

import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { connectionInput, userIdInput } from "../../inputs";

export const getUserRoleSettings = action({
  display: {
    label: "Get User Role Settings",
    description: "Lists user role settings.",
  },
  perform: async (context, { connection, id }) => {
    const client = createClient(connection, context.debug.enabled);
    const { data } = await client.get(`/users/${id}/roleSettings`);
    return { data };
  },
  inputs: {
    connection: connectionInput,
    id: userIdInput,
  },
});

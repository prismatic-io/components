import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { connectionInput, cursor, paginationLimitInput, userIdInput } from "../../inputs";
import { WebhookVersion } from "../../constants";

export const getUserFollowers = action({
  display: {
    label: "Get User Followers",
    description: "Lists followers of a user.",
  },
  perform: async (context, { connection, id, limit, cursor }) => {
    const client = createClient(connection, context.debug.enabled, WebhookVersion.V2);
    const { data } = await client.get(`/users/${id}/followers`, {
      params: { limit, cursor },
    });
    return { data };
  },
  inputs: {
    connection: connectionInput,
    id: userIdInput,
    limit: paginationLimitInput,
    cursor,
  },
});

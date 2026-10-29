import { action } from "@prismatic-io/spectral";
import { getDocuSignClient } from "../client";
import { connection, userId } from "../inputs";
import { getUserPayload } from "../examplePayloads";

export const getUser = action({
  display: {
    label: "Get User",
    description: "Retrieves the user information for the specified user.",
  },
  perform: async (context, { connection, userId }) => {
    const client = await getDocuSignClient(
      connection,
      true,
      context.debug.enabled,
    );
    const { data } = await client.get(`/users/${userId}`);
    return { data };
  },
  inputs: {
    connection,
    userId,
  },
  examplePayload: getUserPayload,
});

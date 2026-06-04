import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { getUserExamplePayload } from "../../examplePayloads";
import { connectionInput, on_behalf_of_user_id, version } from "../../inputs";

export const getUser = action({
  display: {
    label: "Get User",
    description: "Retrieves a user by ID.",
  },
  perform: async (context, { connection, version, user_id }) => {
    const client = createClient(connection, version, context.debug.enabled);
    const { data } = await client.get(`/users/${user_id}`);
    return {
      data,
    };
  },
  inputs: {
    connection: connectionInput,
    version,
    user_id: { ...on_behalf_of_user_id, comments: "ID of the user to get." },
  },
  examplePayload: getUserExamplePayload,
});

import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { getUserExamplePayload } from "../../examplePayloads";
import { connectionInput, includeAttributes, userId } from "../../inputs";

export const getUser = action({
  display: {
    label: "Get User",
    description: "Retrieve a user by ID.",
  },
  perform: async (context, { connection, id, include }) => {
    const client = createClient(connection, context.debug.enabled);
    const { data } = await client.get(`/users/${id}`, {
      params: { "include[]": include },
    });
    return { data };
  },
  inputs: {
    connection: connectionInput,
    id: userId,
    include: includeAttributes,
  },
  examplePayload: getUserExamplePayload,
});

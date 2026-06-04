import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { getUserResponse } from "../../examplePayloads";
import { connection, id } from "../../inputs";

export const getUser = action({
  display: {
    label: "Get User",
    description: "Retrieve a specified user",
  },
  inputs: {
    id: {
      ...id,
      comments: "The ID or username of the user to retrieve",
      dataSource: "selectUser",
    },
    connection,
  },
  perform: async (context, { connection, id }) => {
    const client = createClient(connection, context.debug.enabled);
    const { data } = await client.get(`/users/${id}`);
    return { data };
  },
  examplePayload: {
    data: getUserResponse,
  },
});

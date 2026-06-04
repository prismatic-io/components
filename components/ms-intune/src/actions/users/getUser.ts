import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { connection } from "../../inputs/general";
import getUserInputs from "../../inputs/users/getUserInputs";
import { getUserExamplePayload } from "../../examplePayloads";

export const getUser = action({
  display: {
    label: "Get User",
    description: "Read properties and relationships of the User object.",
  },
  perform: async (context, { connection, userId, $select }) => {
    const client = createClient(connection, context.debug.enabled);
    const params = { $select };
    const { data } = await client.get(`/users/${userId}`, { params });
    return {
      data,
    };
  },
  inputs: {
    connection,
    ...getUserInputs,
  },
  examplePayload: getUserExamplePayload,
});

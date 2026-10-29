import { action } from "@prismatic-io/spectral";
import { getUserInputs } from "../../inputs/users";
import { createClient } from "../../client";
import { getUserExamplePayload } from "../../examplePayloads/users";

export const getUser = action({
  display: {
    label: "Get User",
    description: "Retrieves the user associated with the used API token.",
  },
  perform: async (context, { connection, userId }) => {
    const client = createClient(connection, context.debug.enabled);
    const { data } = await client.get(`/users/${userId}`);

    return {
      data,
    };
  },
  inputs: getUserInputs,
  examplePayload: getUserExamplePayload,
});

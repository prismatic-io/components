import { action } from "@prismatic-io/spectral";
import { getDomoClient } from "../../client";
import { getUserInputs } from "../../inputs";
import { getUserExamplePayload } from "../../examplePayloads";

export const getUser = action({
  display: {
    label: "Get User",
    description: "Retrieves the details of an existing user.",
  },
  examplePayload: getUserExamplePayload,
  perform: async (context, { connection, userId }) => {
    const client = await getDomoClient(connection, context.debug.enabled);
    const { data } = await client.get(`/users/${userId}`, {
      headers: { Accept: "application/json" },
    });
    return { data };
  },
  inputs: getUserInputs,
});

export default { getUser };

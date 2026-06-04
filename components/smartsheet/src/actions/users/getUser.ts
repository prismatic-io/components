import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { getUserExamplePayload } from "../../examplePayloads";
import { getUserInputs } from "../../inputs";

export const getUser = action({
  display: {
    label: "Get User",
    description: "Retrieves a user by their ID.",
  },
  perform: async ({ debug: { enabled: debug } }, { connection, userId }) => {
    const client = createClient(connection, debug);
    const { data } = await client.get(`/users/${userId}`);
    return { data };
  },
  inputs: getUserInputs,
  examplePayload: getUserExamplePayload,
});

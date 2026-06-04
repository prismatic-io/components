import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { createUserExamplePayload } from "../../examplePayloads";
import { connectionInput, userObject } from "../../inputs";

export const createUser = action({
  display: {
    label: "Create User",
    description: "Create a new user.",
  },
  perform: async (context, { connection, user }) => {
    const client = createClient(connection, context.debug.enabled);
    const { data } = await client.post(`/users`, { user });
    return { data };
  },
  inputs: {
    connection: connectionInput,
    user: userObject,
  },
  examplePayload: createUserExamplePayload,
});

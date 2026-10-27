import { action, outputSchema } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { usersGetByUsernameExamplePayload } from "../../examplePayloads";
import { usersGetByUsernameInputs } from "../../inputs";
import { usersGetByUsernameOutputSchema } from "../../outputSchemas";
export const usersGetByUsername = action({
  display: {
    label: "Get User by Username",
    description: "Get a user.",
  },
  examplePayload: usersGetByUsernameExamplePayload,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: usersGetByUsernameOutputSchema,
  }),
  performSafety: "safe",
  perform: async (context, { connection, username }) => {
    const client = createClient(connection, context.debug.enabled);
    const { data } = await client.get(`/users/${username}`);
    return { data };
  },
  inputs: usersGetByUsernameInputs,
});

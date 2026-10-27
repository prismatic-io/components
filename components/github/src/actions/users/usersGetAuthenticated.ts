import { action, outputSchema } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { usersGetAuthenticatedExamplePayload } from "../../examplePayloads";
import { usersGetAuthenticatedInputs } from "../../inputs";
import { usersGetAuthenticatedOutputSchema } from "../../outputSchemas";
export const usersGetAuthenticated = action({
  display: {
    label: "Get Authenticated User",
    description: "Get the authenticated user.",
  },
  examplePayload: usersGetAuthenticatedExamplePayload,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: usersGetAuthenticatedOutputSchema,
  }),
  performSafety: "safe",
  perform: async (context, { connection }) => {
    const client = createClient(connection, context.debug.enabled);
    const { data } = await client.get(`/user`);
    return { data };
  },
  inputs: usersGetAuthenticatedInputs,
});

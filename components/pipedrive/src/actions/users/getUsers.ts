import { action, outputSchema } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { getUsersInputs } from "../../inputs";
import { getUsersExamplePayload } from "../../examplePayloads";
import { getUsersOutputSchema } from "../../outputSchemas";
export const getUsers = action({
  display: {
    label: "Get Users",
    description: "Gets all users.",
  },
  performSafety: "safe",
  perform: async (context, { connection }) => {
    const client = createClient(connection, context.debug.enabled);
    const { data } = await client.get("/users");
    return { data };
  },
  inputs: getUsersInputs,
  examplePayload: getUsersExamplePayload,
  examplePerform: async () => getUsersExamplePayload,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: getUsersOutputSchema,
  }),
});

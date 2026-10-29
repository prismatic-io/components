import { action, outputSchema } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { getUserInputs } from "../../inputs";
import { getUserExamplePayload } from "../../examplePayloads";
import { getUserOutputSchema } from "../../outputSchemas";

export const getUser = action({
  display: {
    label: "Get User",
    description: "Gets one user by ID.",
  },
  performSafety: "safe",
  perform: async (context, { connection, id }) => {
    const client = createClient(connection, context.debug.enabled);
    const { data } = await client.get(`/users/${id}`);
    return { data };
  },
  inputs: getUserInputs,
  examplePayload: getUserExamplePayload,
  examplePerform: async () => getUserExamplePayload,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: getUserOutputSchema,
  }),
});

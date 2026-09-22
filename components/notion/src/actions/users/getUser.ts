import { action, outputSchema } from "@prismatic-io/spectral";
import { getUserOutputSchema } from "../../outputSchemas";
import { createClient } from "../../client";
import { getUserExamplePayload } from "../../examplePayloads";
import { getUserInputs } from "../../inputs";
export const getUser = action({
  display: {
    label: "Get User by ID",
    description: "Get a user by their ID",
  },
  inputs: getUserInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: getUserOutputSchema,
  }),
  performSafety: "safe",
  perform: async (context, params) => {
    const client = createClient(params.connection, context.debug.enabled);
    const { data } = await client.get(`/users/${params.userId}`);
    return { data };
  },
  examplePayload: getUserExamplePayload,
});

import { action, outputSchema } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { retrieveUserExamplePayload } from "../../examplePayloads";
import { retrieveUserInputs } from "../../inputs";
import { retrieveUserOutputSchema } from "../../outputSchemas";
export const retrieveUser = action({
  display: {
    label: "Retrieve User",
    description: "Retrieves a single user by ID.",
  },
  inputs: retrieveUserInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: retrieveUserOutputSchema,
  }),
  perform: async (context, { connection, userId }) => {
    const client = createClient(connection, context.debug.enabled);
    const data = await client.post("/users/retrieve", { id: userId });
    return { data };
  },
  examplePayload: retrieveUserExamplePayload,
});

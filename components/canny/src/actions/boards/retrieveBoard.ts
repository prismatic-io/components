import { action, outputSchema } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { retrieveBoardExamplePayload } from "../../examplePayloads";
import { retrieveBoardInputs } from "../../inputs";
import { retrieveBoardOutputSchema } from "../../outputSchemas";
export const retrieveBoard = action({
  display: {
    label: "Retrieve Board",
    description: "Retrieves a single board by ID.",
  },
  inputs: retrieveBoardInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: retrieveBoardOutputSchema,
  }),
  perform: async (context, { connection, id }) => {
    const client = createClient(connection, context.debug.enabled);
    const data = await client.post("/boards/retrieve", { id });
    return { data };
  },
  examplePayload: retrieveBoardExamplePayload,
});

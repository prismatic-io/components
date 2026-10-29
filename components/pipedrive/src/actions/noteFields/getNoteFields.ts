import { action, outputSchema } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { getNoteFieldsInputs } from "../../inputs";
import { getNoteFieldsExamplePayload } from "../../examplePayloads";
import { getNoteFieldsOutputSchema } from "../../outputSchemas";

export const getNoteFields = action({
  display: {
    label: "Get Note Fields",
    description: "Gets all note fields.",
  },
  performSafety: "safe",
  perform: async (context, { connection }) => {
    const client = createClient(connection, context.debug.enabled);
    const { data } = await client.get("/noteFields");
    return { data };
  },
  inputs: getNoteFieldsInputs,
  examplePayload: getNoteFieldsExamplePayload,
  examplePerform: async () => getNoteFieldsExamplePayload,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: getNoteFieldsOutputSchema,
  }),
});

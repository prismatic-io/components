import { action, outputSchema } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { deletePersonFieldInputs } from "../../inputs";
import { deletePersonFieldExamplePayload } from "../../examplePayloads";
import { deletePersonFieldOutputSchema } from "../../outputSchemas";
export const deletePersonField = action({
  display: {
    label: "Delete Person Field",
    description: "Deletes a person field.",
  },
  performSafety: "notAllowed",
  perform: async (context, { connection, id }) => {
    const client = createClient(connection, context.debug.enabled);
    const { data } = await client.delete(`/personFields/${id}`);
    return { data };
  },
  inputs: deletePersonFieldInputs,
  examplePayload: deletePersonFieldExamplePayload,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: deletePersonFieldOutputSchema,
  }),
});

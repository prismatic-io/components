import { action, outputSchema } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { updateFileInputs } from "../../inputs";
import { updateFileExamplePayload } from "../../examplePayloads";
import { updateFileOutputSchema } from "../../outputSchemas";

export const updateFile = action({
  display: {
    label: "Update File",
    description: "Updates the file name or description.",
  },
  performSafety: "notAllowed",
  perform: async (context, { connection, id, name, description }) => {
    const client = createClient(connection, context.debug.enabled);
    const { data } = await client.patch(`/files/${id}`, { name, description });
    return { data };
  },
  inputs: updateFileInputs,
  examplePayload: updateFileExamplePayload,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: updateFileOutputSchema,
  }),
});

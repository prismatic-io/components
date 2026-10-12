import { action, outputSchema } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { deleteFileInputs } from "../../inputs";
import { deleteFileExamplePayload } from "../../examplePayloads";
import { deleteFileOutputSchema } from "../../outputSchemas";
export const deleteFile = action({
  display: {
    label: "Delete File",
    description: "Deletes a file.",
  },
  performSafety: "notAllowed",
  perform: async (context, { connection, id }) => {
    const client = createClient(connection, context.debug.enabled);
    const { data } = await client.delete(`/files/${id}`);
    return { data };
  },
  inputs: deleteFileInputs,
  examplePayload: deleteFileExamplePayload,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: deleteFileOutputSchema,
  }),
});

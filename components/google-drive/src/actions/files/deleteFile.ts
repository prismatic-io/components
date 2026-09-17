import { action, outputSchema } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { deleteFileInputs } from "../../inputs";
import { deleteFileOutputSchema } from "../../outputSchemas";
import { deleteFileExamplePayload } from "../../examplePayloads";
export const deleteFile = action({
  display: {
    label: "Delete File",
    description: "Delete a file by file id",
  },
  performSafety: "notAllowed",
  perform: async (_context, { connection, fileId, fields }) => {
    const drive = createClient(connection);
    const { data } = await drive.files.delete({
      fileId,
      fields,
      supportsAllDrives: true,
    });
    return {
      data,
    };
  },
  inputs: deleteFileInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: deleteFileOutputSchema,
  }),
  examplePerform: async (): Promise<{
    data: unknown;
  }> => ({ data: {} }),
  examplePayload: deleteFileExamplePayload,
});
export default deleteFile;

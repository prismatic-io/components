import { action, outputSchema } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { getFileMetadataInputs } from "../../inputs";
import { getFileMetadataOutputSchema } from "../../outputSchemas";
import { getFileMetadataExamplePayload } from "../../examplePayloads";
export const getFileMetadata = action({
  display: {
    label: "Get File Metadata",
    description: "Gets a file's metadata by ID.",
  },
  performSafety: "safe",
  perform: async (_context, { connection, fileId, metadataFields }) => {
    const drive = createClient(connection);
    const { data } = await drive.files.get({
      fileId,
      fields: metadataFields,
      supportsAllDrives: true,
    });
    return {
      data,
    };
  },
  inputs: getFileMetadataInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: getFileMetadataOutputSchema,
  }),
  examplePayload: getFileMetadataExamplePayload,
});
export default getFileMetadata;

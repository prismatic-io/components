import { action, outputSchema, util } from "@prismatic-io/spectral";
import { Readable } from "node:stream";
import { createClient } from "../../client";
import { uploadFileExamplePayload } from "../../examplePayloads";
import { uploadFileInputs } from "../../inputs";
import { uploadFileOutputSchema } from "../../outputSchemas";

export const uploadFile = action({
  display: {
    label: "Upload File",
    description: "Upload a file to the specified drive or folder's drive.",
  },
  inputs: uploadFileInputs,
  performSafety: "notAllowed",
  perform: async (
    { debug: { enabled: debug } },
    { connection, driveId, fileName, folderId, fileData },
  ) => {
    const client = await createClient(connection, debug);
    const { data } = util.types.toData(fileData);
    const { data: uploadedData } = await client.put(
      `/drives/${driveId}/items/${folderId}:/${fileName}:/content`,
      Readable.from(data),
    );

    return {
      data: uploadedData,
    };
  },
  examplePerform: async (_context, { fileName }) => ({
    data: { ...uploadFileExamplePayload.data, name: fileName },
  }),
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: uploadFileOutputSchema,
  }),
  examplePayload: uploadFileExamplePayload,
});

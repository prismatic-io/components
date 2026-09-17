import { Readable } from "node:stream";
import { action, outputSchema, util } from "@prismatic-io/spectral";
import mime from "mime-types";
import { createClient } from "../../client";
import { updateFileInputs } from "../../inputs";
import { updateFileOutputSchema } from "../../outputSchemas";
import { updateFileExamplePayload } from "../../examplePayloads";
export const updateFile = action({
  display: {
    label: "Update File",
    description: "Updates a file's content by file id",
  },
  performSafety: "notAllowed",
  perform: async (_context, params) => {
    const { fileId } = params;
    const fileName = util.types.toString(params.fileName);
    const fields = util.types.toString(params.fields);
    const { data: fileData } = util.types.toData(params.fileContent);
    const mimeType = mime.lookup(fileName) || undefined;
    const drive = createClient(params.connection);
    const { data } = await drive.files.update({
      fileId,
      requestBody: {
        name: fileName,
        mimeType,
      },
      media: {
        mimeType,
        body: Readable.from(fileData),
      },
      fields,
      supportsAllDrives: true,
    });
    return {
      data,
    };
  },
  inputs: updateFileInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: updateFileOutputSchema,
  }),
  examplePerform: async (
    _context,
    params,
  ): Promise<{
    data: unknown;
  }> => {
    const fileName = util.types.toString(params.fileName);
    return {
      data: {
        ...updateFileExamplePayload.data,
        id: params.fileId,
        name: fileName || updateFileExamplePayload.data.name,
        mimeType:
          mime.lookup(fileName) || updateFileExamplePayload.data.mimeType,
      },
    };
  },
  examplePayload: updateFileExamplePayload,
});
export default updateFile;

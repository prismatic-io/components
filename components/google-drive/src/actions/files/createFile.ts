import { Readable } from "node:stream";
import { action, outputSchema, util } from "@prismatic-io/spectral";
import mime from "mime-types";
import { createClient } from "../../client";
import { createFileInputs } from "../../inputs";
import { createFileOutputSchema } from "../../outputSchemas";
import { createFileExamplePayload } from "../../examplePayloads";
export const createFile = action({
  display: {
    label: "Create File",
    description: "Create a new file with content and metadata",
  },
  performSafety: "notAllowed",
  perform: async (_context, params) => {
    const { fileName, folderId } = params;
    const fields = util.types.toString(params.fields);
    const { data: fileData } = util.types.toData(params.fileContent);
    const mimeType = mime.lookup(fileName) || undefined;
    const drive = createClient(params.connection);
    const { data } = await drive.files.create({
      requestBody: {
        name: fileName,
        parents: [folderId],
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
  inputs: createFileInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: createFileOutputSchema,
  }),
  examplePerform: async (
    _context,
    params,
  ): Promise<{
    data: unknown;
  }> => {
    const { fileName, folderId } = params;
    return {
      data: {
        ...createFileExamplePayload.data,
        name: fileName,
        mimeType:
          mime.lookup(fileName) || createFileExamplePayload.data.mimeType,
        parents: folderId ? [folderId] : createFileExamplePayload.data.parents,
      },
    };
  },
  examplePayload: createFileExamplePayload,
});
export default createFile;

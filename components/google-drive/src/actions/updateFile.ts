import { action, util } from "@prismatic-io/spectral";
import mime from "mime-types";
import { Readable } from "node:stream";
import { createClient } from "../client";
import { connection, fileId, fileContent, fileName, fields } from "../inputs";

export const updateFile = action({
  display: {
    label: "Update File",
    description: "Updates a file's content by file id",
  },
  perform: async (_context, params) => {
    const fileId = util.types.toString(params.fileId);
    const fileName = util.types.toString(params.fileName);
    const fields = util.types.toString(params.fields);
    const { data: fileData } = util.types.toData(params.fileContent);

    const mimeType = mime.lookup(fileName) || undefined;

    const drive = createClient(params.connection);

    const { data } = await drive.files.update({
      fileId,
      requestBody: {
        name: fileName,
        mimeType: mimeType || undefined,
      },
      media: {
        mimeType: mimeType || undefined,
        body: Readable.from(fileData),
      },
      fields,
      supportsAllDrives: true,
    });

    return {
      data,
    };
  },
  inputs: {
    connection,
    fileId,
    fileContent: { ...fileContent, required: false },
    fileName,
    fields,
  },
  examplePayload: {
    data: {
      kind: "drive#file",
      id: "id_example",
      name: "example",
      mimeType: "example",
      description: "example",
    },
  },
});

export default updateFile;

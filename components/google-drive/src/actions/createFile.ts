import { action, util } from "@prismatic-io/spectral";
import mime from "mime-types";
import { Readable } from "node:stream";
import { createClient } from "../client";
import { connection, fileContent, folderId, fileName, fields } from "../inputs";

export const createFile = action({
  display: {
    label: "Create File",
    description: "Create a new file with content and metadata",
  },
  perform: async (_context, params) => {
    const fileName = util.types.toString(params.fileName);
    const folderId = util.types.toString(params.folderId);
    const fields = util.types.toString(params.fields);
    const { data: fileData } = util.types.toData(params.fileContent);

    const mimeType = mime.lookup(fileName) || undefined;

    const drive = createClient(params.connection);

    const { data } = await drive.files.create({
      requestBody: {
        name: fileName,
        parents: [folderId || undefined],
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
  inputs: {
    connection,
    folderId: { ...folderId, label: "Parent Folder Id" },
    fileContent,
    fileName: { ...fileName, required: true },
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

export default createFile;

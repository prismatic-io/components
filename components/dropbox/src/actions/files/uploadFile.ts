import { action, outputSchema } from "@prismatic-io/spectral";
import { createAuthorizedClient } from "../../auth";
import { uploadFileExamplePayload } from "../../examplePayloads";
import { uploadFileInputs } from "../../inputs";
import { uploadFileOutputSchema } from "../../outputSchemas";
import {
  checkDebug,
  handleDropboxError,
  pathBasename,
  validatePath,
} from "../../util";
export const uploadFile = action({
  display: {
    label: "Upload File",
    description: "Upload a file to the specified path",
  },
  performSafety: "notAllowed",
  perform: async (context, { dropboxConnection, path, fileContents }) => {
    checkDebug({ dropboxConnection, path, fileContents }, context);
    validatePath(path);
    const dbx = createAuthorizedClient(dropboxConnection);
    const { data } = fileContents;
    try {
      const result = await dbx.filesUpload({
        path: path,
        contents: data,
        mode: { ".tag": "overwrite" },
      });
      return {
        data: result,
      };
    } catch (err) {
      handleDropboxError(err, [path]);
    }
  },
  examplePerform: async (
    _context,
    { path },
  ): Promise<{
    data: unknown;
  }> => ({
    data: {
      ...uploadFileExamplePayload,
      result: {
        ...uploadFileExamplePayload.result,
        name: pathBasename(path),
      },
    },
  }),
  inputs: uploadFileInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: uploadFileOutputSchema,
  }),
  examplePayload: {
    data: uploadFileExamplePayload,
  },
});

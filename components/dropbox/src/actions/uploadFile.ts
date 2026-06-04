import { action } from "@prismatic-io/spectral";
import { createAuthorizedClient } from "../auth";
import { uploadFileExamplePayload } from "../example-payloads";
import { connectionInput, fileContents, path } from "../inputs";
import { checkDebug, handleDropboxError, validatePath } from "../util";

export const uploadFile = action({
  display: {
    label: "Upload File",
    description: "Upload a file to the specified path",
  },
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
  inputs: { dropboxConnection: connectionInput, path, fileContents },
  examplePayload: {
    data: uploadFileExamplePayload,
  },
});

import { action, util } from "@prismatic-io/spectral";
import { createAuthorizedClient } from "../auth";
import { copyObjectExamplePayload } from "../example-payloads";
import { connectionInput, fromPath, toPath } from "../inputs";
import { checkDebug, handleDropboxError, validatePath } from "../util";

export const copyObject = action({
  display: {
    label: "Copy Object",
    description: "Copy a Folder or File from one path to another",
  },
  perform: async (context, { dropboxConnection, fromPath, toPath }) => {
    checkDebug({ dropboxConnection, fromPath, toPath }, context);
    validatePath(fromPath);
    validatePath(toPath);
    const dbx = createAuthorizedClient(dropboxConnection);
    try {
      const result = await dbx.filesCopyV2({
        from_path: util.types.toString(fromPath),
        to_path: util.types.toString(toPath),
      });
      return {
        data: result,
      };
    } catch (err) {
      handleDropboxError(err, [fromPath, toPath]);
    }
  },
  inputs: { dropboxConnection: connectionInput, fromPath, toPath },
  examplePayload: {
    data: copyObjectExamplePayload,
  },
});

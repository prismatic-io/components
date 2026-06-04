import { action, util } from "@prismatic-io/spectral";
import { createAuthorizedClient } from "../auth";
import { deleteObjectExamplePayload } from "../example-payloads";
import { connectionInput, path } from "../inputs";
import { checkDebug, handleDropboxError, validatePath } from "../util";

export const deleteObject = action({
  display: {
    label: "Delete Object",
    description: "Delete a Folder or File at the specified path",
  },
  perform: async (context, { dropboxConnection, path }) => {
    checkDebug(
      {
        dropboxConnection,
        path,
      },
      context,
    );
    validatePath(path);
    const dbx = createAuthorizedClient(dropboxConnection);
    try {
      const result = await dbx.filesDeleteV2({
        path: util.types.toString(path),
      });
      return {
        data: result,
      };
    } catch (err) {
      handleDropboxError(err, [path]);
    }
  },
  inputs: { dropboxConnection: connectionInput, path },
  examplePayload: {
    data: deleteObjectExamplePayload,
  },
});

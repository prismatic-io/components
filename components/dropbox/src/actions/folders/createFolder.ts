import { action, outputSchema, util } from "@prismatic-io/spectral";
import { createAuthorizedClient } from "../../auth";
import { createFolderExamplePayload } from "../../examplePayloads";
import { createFolderInputs } from "../../inputs";
import { createFolderOutputSchema } from "../../outputSchemas";
import {
  checkDebug,
  handleDropboxError,
  pathBasename,
  validatePath,
} from "../../util";
export const createFolder = action({
  display: {
    label: "Create Folder",
    description: "Create a Folder at the specified path",
  },
  performSafety: "notAllowed",
  perform: async (context, { dropboxConnection, path }) => {
    checkDebug({ dropboxConnection, path }, context);
    validatePath(path);
    const dbx = createAuthorizedClient(dropboxConnection);
    try {
      const result = await dbx.filesCreateFolderV2({
        path: util.types.toString(path),
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
      ...createFolderExamplePayload,
      result: {
        ...createFolderExamplePayload.result,
        metadata: {
          ...createFolderExamplePayload.result.metadata,
          name: pathBasename(path),
        },
      },
    },
  }),
  inputs: createFolderInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: createFolderOutputSchema,
  }),
  examplePayload: {
    data: createFolderExamplePayload,
  },
});

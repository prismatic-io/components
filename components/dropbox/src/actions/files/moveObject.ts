import { action, outputSchema, util } from "@prismatic-io/spectral";
import { createAuthorizedClient } from "../../auth";
import { moveObjectExamplePayload } from "../../examplePayloads";
import { moveObjectInputs } from "../../inputs";
import { moveObjectOutputSchema } from "../../outputSchemas";
import {
  checkDebug,
  handleDropboxError,
  pathBasename,
  validatePath,
} from "../../util";
export const moveObject = action({
  display: {
    label: "Move Object",
    description: "Move a Folder or File from one path to another",
  },
  performSafety: "notAllowed",
  perform: async (context, { dropboxConnection, fromPath, toPath }) => {
    checkDebug({ dropboxConnection, fromPath, toPath }, context);
    validatePath(fromPath);
    validatePath(toPath);
    const dbx = createAuthorizedClient(dropboxConnection);
    try {
      const result = await dbx.filesMoveV2({
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
  examplePerform: async (
    _context,
    { toPath },
  ): Promise<{
    data: unknown;
  }> => ({
    data: {
      ...moveObjectExamplePayload,
      result: {
        ...moveObjectExamplePayload.result,
        metadata: {
          ...moveObjectExamplePayload.result.metadata,
          name: pathBasename(toPath),
        },
      },
    },
  }),
  inputs: moveObjectInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: moveObjectOutputSchema,
  }),
  examplePayload: {
    data: moveObjectExamplePayload,
  },
});

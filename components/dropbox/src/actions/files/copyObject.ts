import { action, outputSchema, util } from "@prismatic-io/spectral";
import { createAuthorizedClient } from "../../auth";
import { copyObjectExamplePayload } from "../../examplePayloads";
import { copyObjectInputs } from "../../inputs";
import { copyObjectOutputSchema } from "../../outputSchemas";
import {
  checkDebug,
  handleDropboxError,
  pathBasename,
  validatePath,
} from "../../util";
export const copyObject = action({
  display: {
    label: "Copy Object",
    description: "Copy a Folder or File from one path to another",
  },
  performSafety: "notAllowed",
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
  examplePerform: async (
    _context,
    { toPath },
  ): Promise<{
    data: unknown;
  }> => ({
    data: {
      ...copyObjectExamplePayload,
      result: {
        ...copyObjectExamplePayload.result,
        metadata: {
          ...copyObjectExamplePayload.result.metadata,
          name: pathBasename(toPath),
        },
      },
    },
  }),
  inputs: copyObjectInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: copyObjectOutputSchema,
  }),
  examplePayload: {
    data: copyObjectExamplePayload,
  },
});

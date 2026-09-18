import { action, outputSchema, util } from "@prismatic-io/spectral";
import { createAuthorizedClient } from "../../auth";
import { deleteObjectExamplePayload } from "../../examplePayloads";
import { deleteObjectInputs } from "../../inputs";
import { deleteObjectOutputSchema } from "../../outputSchemas";
import {
  checkDebug,
  handleDropboxError,
  pathBasename,
  validatePath,
} from "../../util";
export const deleteObject = action({
  display: {
    label: "Delete Object",
    description: "Delete a Folder or File at the specified path",
  },
  performSafety: "notAllowed",
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
  examplePerform: async (
    _context,
    { path },
  ): Promise<{
    data: unknown;
  }> => ({
    data: {
      ...deleteObjectExamplePayload,
      result: {
        ...deleteObjectExamplePayload.result,
        metadata: {
          ...deleteObjectExamplePayload.result.metadata,
          name: pathBasename(path),
        },
      },
    },
  }),
  inputs: deleteObjectInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: deleteObjectOutputSchema,
  }),
  examplePayload: {
    data: deleteObjectExamplePayload,
  },
});

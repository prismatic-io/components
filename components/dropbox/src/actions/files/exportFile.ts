import { action, outputSchema } from "@prismatic-io/spectral";
import { createAuthorizedClient } from "../../auth";
import { exportFileExamplePayload } from "../../examplePayloads";
import { exportFileInputs } from "../../inputs";
import { exportFileOutputSchema } from "../../outputSchemas";
import { checkDebug, handleDropboxError, pathBasename } from "../../util";
export const exportFile = action({
  display: {
    label: "Export File",
    description: "Export the file at the specified path",
  },
  performSafety: "notAllowed",
  perform: async (context, params) => {
    checkDebug(params, context);
    const dbx = createAuthorizedClient(
      params.dropboxConnection,
      params.userType,
      params.teamMemberId,
    );
    try {
      const data = await dbx.filesExport({
        path: params.path,
      });
      return {
        data,
      };
    } catch (err) {
      handleDropboxError(err, [params.path]);
    }
  },
  examplePerform: async (
    _context,
    { path },
  ): Promise<{
    data: unknown;
  }> => ({
    data: {
      ...exportFileExamplePayload,
      result: {
        ...exportFileExamplePayload.result,
        file_metadata: {
          ...exportFileExamplePayload.result.file_metadata,
          name: pathBasename(path),
          path_display: path,
          path_lower: path.toLowerCase(),
        },
      },
    },
  }),
  inputs: exportFileInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: exportFileOutputSchema,
  }),
  examplePayload: {
    data: exportFileExamplePayload,
  },
});

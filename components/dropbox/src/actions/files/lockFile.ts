import { action, outputSchema } from "@prismatic-io/spectral";
import { createAuthorizedClient } from "../../auth";
import { MISSING_PATHS_ERROR_MESSAGE } from "../../constants";
import { lockFileBatchExamplePayload } from "../../examplePayloads";
import { lockFileInputs } from "../../inputs";
import { lockFileOutputSchema } from "../../outputSchemas";
import {
  checkDebug,
  getEntries,
  handleDropboxError,
  pathBasename,
} from "../../util";
export const lockFile = action({
  display: {
    label: "Lock File",
    description: "Lock the files at the given paths",
  },
  performSafety: "notAllowed",
  perform: async (
    context,
    { filePaths, dropboxConnection, teamMemberId, dynamicPaths },
  ) => {
    checkDebug(
      {
        filePaths,
        dropboxConnection,
        teamMemberId,
        dynamicPaths,
      },
      context,
    );
    if (!filePaths && !dynamicPaths) {
      throw new Error(MISSING_PATHS_ERROR_MESSAGE);
    }
    const dbx = createAuthorizedClient(
      dropboxConnection,
      teamMemberId ? "user" : undefined,
      teamMemberId,
    );
    const entries = getEntries(filePaths, dynamicPaths);
    try {
      const args = {
        entries,
      };
      const result = await dbx.filesLockFileBatch(args);
      return {
        data: result,
      };
    } catch (err) {
      handleDropboxError(err, entries);
    }
  },
  examplePerform: async (
    _context,
    { filePaths, dynamicPaths },
  ): Promise<{
    data: unknown;
  }> => {
    const [exampleEntry] = lockFileBatchExamplePayload.result.entries;
    return {
      data: {
        ...lockFileBatchExamplePayload,
        result: {
          entries: getEntries(filePaths, dynamicPaths).map(({ path }) => ({
            ...exampleEntry,
            metadata: {
              ...("metadata" in exampleEntry ? exampleEntry.metadata : {}),
              name: pathBasename(path),
              path_display: path,
              path_lower: path.toLowerCase(),
            },
          })),
        },
      },
    };
  },
  inputs: lockFileInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: lockFileOutputSchema,
  }),
  examplePayload: {
    data: lockFileBatchExamplePayload,
  },
});

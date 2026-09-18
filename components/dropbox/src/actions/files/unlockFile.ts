import { action, outputSchema } from "@prismatic-io/spectral";
import { createAuthorizedClient } from "../../auth";
import { MISSING_PATHS_ERROR_MESSAGE } from "../../constants";
import { unlockFileExamplePayload } from "../../examplePayloads";
import { unlockFileInputs } from "../../inputs";
import { unlockFileOutputSchema } from "../../outputSchemas";
import {
  checkDebug,
  getEntries,
  handleDropboxError,
  pathBasename,
} from "../../util";
export const unlockFile = action({
  display: {
    label: "Unlock File",
    description: "Unlock the files at the given paths",
  },
  performSafety: "notAllowed",
  perform: async (
    context,
    { filePaths, dropboxConnection, userType, teamMemberId, dynamicPaths },
  ) => {
    checkDebug(
      {
        filePaths,
        dropboxConnection,
        userType,
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
      userType,
      teamMemberId,
    );
    const entries = getEntries(filePaths, dynamicPaths);
    try {
      const args = {
        entries,
      };
      const result = await dbx.filesUnlockFileBatch(args);
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
    const [exampleEntry] = unlockFileExamplePayload.result.entries;
    return {
      data: {
        ...unlockFileExamplePayload,
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
  inputs: unlockFileInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: unlockFileOutputSchema,
  }),
  examplePayload: {
    data: unlockFileExamplePayload,
  },
});

import { action, outputSchema } from "@prismatic-io/spectral";
import { createAuthorizedClient } from "../../auth";
import { MISSING_PATHS_ERROR_MESSAGE } from "../../constants";
import { getFileLockExamplePayload } from "../../examplePayloads";
import { getFileLockInputs } from "../../inputs";
import { getFileLockOutputSchema } from "../../outputSchemas";
import { checkDebug, getEntries, handleDropboxError } from "../../util";
export const getFileLock = action({
  display: {
    label: "Get File Lock",
    description: "Return the lock metadata for the given list of paths",
  },
  performSafety: "safe",
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
      const result = await dbx.filesGetFileLockBatch(args);
      return {
        data: result,
      };
    } catch (err) {
      handleDropboxError(err, entries);
    }
  },
  inputs: getFileLockInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: getFileLockOutputSchema,
  }),
  examplePayload: {
    data: getFileLockExamplePayload,
  },
});

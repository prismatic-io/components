import { action, outputSchema } from "@prismatic-io/spectral";
import { createAemClient } from "../../client";
import { FOLDERS_API_PATH } from "../../constants";
import { deleteFoldersExamplePayload } from "../../examplePayloads";
import { deleteFoldersInputs } from "../../inputs";
import { deleteFoldersOutputSchema } from "../../outputSchemas";
import type { AemJob, FolderCommandResult } from "../../types";
import { assertFolderCommandProgress, isAemJob } from "../../utils";

export const deleteFolders = action({
  display: {
    label: "Delete Folders",
    description:
      "Delete one or more asset folders by path. Fails when no folder could be deleted; when only some fail, they are listed in failedFolders. A request that runs as a job returns a job ID; check it with Get Folder Job Status.",
  },
  performSafety: "notAllowed",
  perform: async (context, { connection, folderPaths, recursive, force }) => {
    const client = createAemClient(connection, context.debug.enabled);
    const { data } = await client.post<AemJob | FolderCommandResult>(`${FOLDERS_API_PATH}/delete`, {
      paths: folderPaths,
      recursive,
      force,
    });
    if (isAemJob(data)) return { data };
    return {
      data: assertFolderCommandProgress(data, data.data?.deletedFolders?.length ?? 0, [
        ...(data.data?.failedFolders ?? []),
        ...(data.errors ?? []),
      ]),
    };
  },
  inputs: deleteFoldersInputs,
  outputSchema: outputSchema({ type: "actionOutput", schema: deleteFoldersOutputSchema }),
  examplePerform: async () => deleteFoldersExamplePayload,
  examplePayload: deleteFoldersExamplePayload,
});

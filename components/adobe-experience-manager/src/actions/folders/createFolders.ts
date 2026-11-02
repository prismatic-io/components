import { action, outputSchema } from "@prismatic-io/spectral";
import { createAemClient } from "../../client";
import { FOLDERS_API_PATH } from "../../constants";
import { createFoldersExamplePayload } from "../../examplePayloads";
import { createFoldersInputs } from "../../inputs";
import { createFoldersOutputSchema } from "../../outputSchemas";
import type { AemJob, FolderCommandResult } from "../../types";
import { assertFolderCommandProgress, isAemJob } from "../../utils";

export const createFolders = action({
  display: {
    label: "Create Folders",
    description:
      "Create one or more asset folders. Fails when no folder could be created; when only some fail, they are listed in failedFolders. A request that runs as a job returns a job ID; check it with Get Folder Job Status.",
  },
  performSafety: "notAllowed",
  perform: async (context, { connection, folderPaths }) => {
    const client = createAemClient(connection, context.debug.enabled);
    const { data } = await client.post<AemJob | FolderCommandResult>(
      `${FOLDERS_API_PATH}/`,
      folderPaths.map((path) => ({ path })),
    );
    if (isAemJob(data)) return { data };
    const values = data.data?.values;
    return {
      data: assertFolderCommandProgress(data, values?.successes?.length ?? 0, [
        ...(values?.failedFolders ?? []),
        ...(data.errors ?? []),
      ]),
    };
  },
  inputs: createFoldersInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: createFoldersOutputSchema,
  }),
  examplePerform: async () => createFoldersExamplePayload,
  examplePayload: createFoldersExamplePayload,
});

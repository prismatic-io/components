import { pollingTrigger } from "@prismatic-io/spectral";
import { createClient } from "../client";
import { newOrModifiedFilesExamplePayload } from "../examplePayloads";
import { newOrModifiedFilesInputs } from "../inputs";
import type { FileMap, PollingState } from "../types";
import { computeFileChanges, listFilesRecursive } from "../util";
export const newOrModifiedFiles = pollingTrigger({
  display: {
    label: "New or Modified Files",
    description:
      "Checks for new and modified files in a directory on an FTP server on a configured schedule.",
  },
  inputs: newOrModifiedFilesInputs,
  examplePayload: newOrModifiedFilesExamplePayload,
  perform: async (
    context,
    payload,
    { connection, path, pattern, includeSubdirectories },
  ) => {
    const client = await createClient(connection, context.debug.enabled);
    try {
      const currentFileMap: FileMap = {};
      await listFilesRecursive(
        client,
        path,
        pattern,
        includeSubdirectories,
        currentFileMap,
      );
      const pollState = context.polling.getState() as unknown as
        | PollingState
        | undefined;
      const previousFileMap: FileMap = pollState?.fileMap ?? {};
      const { newFiles, modifiedFiles } = computeFileChanges(
        currentFileMap,
        previousFileMap,
      );
      context.polling.setState({ fileMap: currentFileMap });
      return {
        payload: {
          ...payload,
          body: { data: { newFiles, modifiedFiles } },
        },
        polledNoChanges: newFiles.length === 0 && modifiedFiles.length === 0,
      };
    } finally {
      client.close();
    }
  },
});

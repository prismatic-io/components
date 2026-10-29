import { pollingTrigger } from "@prismatic-io/spectral";
import { connection, path, pattern, includeSubdirectories } from "../inputs";
import { getSftpClient } from "../client";
import type { FileMap, PollingState } from "../types";
import { computeFileChanges, listFilesRecursive } from "../util";

export const newOrModifiedFiles = pollingTrigger({
  display: {
    label: "New or Modified Files",
    description:
      "Checks for new and modified files in a directory on an SFTP server on a configured schedule.",
  },
  inputs: {
    connection,
    path,
    pattern,
    includeSubdirectories,
  },
  perform: async (
    context,
    payload,
    { connection, path, pattern, includeSubdirectories },
  ) => {
    const sftp = await getSftpClient(connection, context.debug.enabled);

    try {
      const currentFileMap: FileMap = {};
      await listFilesRecursive(
        sftp,
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
      await sftp.end();
    }
  },
});

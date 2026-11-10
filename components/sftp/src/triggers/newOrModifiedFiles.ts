import { pollingTrigger } from "@prismatic-io/spectral";
import { connection, path, pattern, includeSubdirectories } from "../inputs";
import { getSftpClient } from "../client";
import type {
  FileChange,
  FileChangesObject,
  FileMap,
  PollingState,
} from "../types";
import {
  computeFileChanges,
  listFilesRecursive,
  resolveFileChanges,
} from "../util";

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
  triggerResolverSupport: "valid",
  batchConfig: { batchSize: 50 },
  triggerResolver: {
    resolveItems: (_context, { payload }): FileChange[] =>
      resolveFileChanges(payload.body.data as FileChangesObject),
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

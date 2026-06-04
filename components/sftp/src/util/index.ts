import type Client from "ssh2-sftp-client";
import { minimatch } from "minimatch";
import type { FileEntry, FileMap } from "../types";

export const listFilesRecursive = async (
  sftp: Client,
  currentPath: string,
  filePattern: string,
  recursive: boolean,
  fileMap: FileMap,
): Promise<void> => {
  const fileList = await sftp.list(currentPath);

  for (const file of fileList) {
    const fullPath = `${currentPath}/${file.name}`.replace(/\/+/g, "/");

    if (file.type === "d") {
      if (recursive) {
        await listFilesRecursive(
          sftp,
          fullPath,
          filePattern,
          recursive,
          fileMap,
        );
      }
    } else {
      if (!filePattern || minimatch(file.name, filePattern)) {
        fileMap[fullPath] = {
          size: file.size,
          modifiedAt: file.modifyTime,
        };
      }
    }
  }
};

export const computeFileChanges = (
  currentFileMap: FileMap,
  previousFileMap: FileMap,
): { newFiles: FileEntry[]; modifiedFiles: FileEntry[] } => {
  const newFiles: FileEntry[] = [];
  const modifiedFiles: FileEntry[] = [];

  for (const [filePath, metadata] of Object.entries(currentFileMap)) {
    const previous = previousFileMap[filePath];

    if (!previous) {
      newFiles.push({
        path: filePath,
        size: metadata.size,
        modifiedAt: metadata.modifiedAt,
      });
    } else if (
      previous.size !== metadata.size ||
      previous.modifiedAt !== metadata.modifiedAt
    ) {
      modifiedFiles.push({
        path: filePath,
        size: metadata.size,
        modifiedAt: metadata.modifiedAt,
      });
    }
  }

  return { newFiles, modifiedFiles };
};

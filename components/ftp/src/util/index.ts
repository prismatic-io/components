import type { Client } from "basic-ftp";
import { minimatch } from "minimatch";
import type { FileEntry, FileMap } from "../types";

export const listFilesRecursive = async (
  client: Client,
  currentPath: string,
  filePattern: string,
  recursive: boolean,
  fileMap: FileMap,
): Promise<void> => {
  
  await client.cd(currentPath);
  const entries = await client.list();

  for (const entry of entries) {
    const fullPath = `${currentPath}/${entry.name}`.replace(/\/+/g, "/");

    if (entry.isDirectory) {
      if (recursive) {
        await listFilesRecursive(
          client,
          fullPath,
          filePattern,
          recursive,
          fileMap,
        );
      }
    } else if (!entry.isSymbolicLink && entry.isFile) {
      if (!filePattern || minimatch(entry.name, filePattern)) {
        fileMap[fullPath] = {
          size: entry.size,
          modifiedAt: entry.modifiedAt ? entry.modifiedAt.getTime() : 0,
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

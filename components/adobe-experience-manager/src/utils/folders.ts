import type { HttpClient } from "@prismatic-io/spectral/dist/clients/http";
import {
  FOLDERS_API_PATH,
  MAX_FOLDER_WALK,
  MAX_PAGE_LIMIT,
} from "../constants";
import type {
  AemJob,
  FolderCommandProblem,
  FolderCommandResult,
  FolderListingResponse,
  FolderTree,
} from "../types";

export const isAemJob = (value: unknown): value is AemJob =>
  typeof value === "object" && value !== null && "jobId" in value;

export const assertFolderCommandProgress = <
  T extends AemJob | FolderCommandResult,
>(
  result: T,
  succeeded: number,
  failures: FolderCommandProblem[],
): T => {
  if (succeeded === 0 && failures.length) {
    const reasons = failures.map(
      (f) => f.detail ?? f.title ?? f.path ?? "unknown error",
    );
    const summary = "description" in result ? result.description : undefined;
    throw new Error(
      `${summary ?? "The folder request failed."} ${reasons.join("; ")}`,
    );
  }
  return result;
};

export const walkFolderTree = async (
  client: HttpClient,
  rootPath: string,
  {
    collectAssets,
    maxFolders = MAX_FOLDER_WALK,
  }: { collectAssets: boolean; maxFolders?: number },
): Promise<FolderTree> => {
  const tree: FolderTree = { folders: [], assets: [], truncated: false };
  const queue = [rootPath];
  let visited = 0;
  while (queue.length && visited < maxFolders) {
    const folderPath = queue.shift() as string;
    visited++;
    let cursor: string | undefined;
    do {
      const { data } = await client.get<FolderListingResponse>(
        `${FOLDERS_API_PATH}/`,
        {
          params: {
            path: folderPath,
            types: collectAssets ? "FOLDER,ASSET" : "FOLDER",
            limit: MAX_PAGE_LIMIT,
            cursor,
          },
        },
      );
      for (const child of data.children ?? []) {
        if (child.type === "FOLDER") {
          tree.folders.push(child);
          queue.push(child.path);
        } else if (collectAssets) {
          tree.assets.push({ ...child, folderPath });
        }
      }
      cursor = data.cursor;
    } while (cursor);
  }
  tree.truncated = queue.length > 0;
  return tree;
};

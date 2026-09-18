import type { DropboxEntry } from "../types";
import { validatePath } from "./paths";
export const getEntries = (
  filePaths?: string[],
  dynamicPaths?: string[],
): Array<{
  path: string;
}> => {
  let entries = Array.isArray(filePaths)
    ? filePaths.map((path) => {
        validatePath(path);
        return { path };
      })
    : [];
  if (dynamicPaths && Array.isArray(dynamicPaths)) {
    entries = entries.concat(
      dynamicPaths.map((path) => {
        validatePath(path);
        return { path };
      }),
    );
  }
  return entries;
};
export const filterEntries = (
  entries: DropboxEntry[],
  filter: string,
): DropboxEntry[] => {
  return entries.filter(({ ".tag": tag }) => tag === filter);
};

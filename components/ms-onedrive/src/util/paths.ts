import {
  DRIVE_ROOT_PREFIX,
  GRAPH_RESOURCE_PREFIXES,
  ROOT_CHILDREN_PATH,
} from "../constants";

export const driveRootPath = (path: string): string =>
  path.startsWith(DRIVE_ROOT_PREFIX) ? path : `${DRIVE_ROOT_PREFIX}${path}`;

export const folderChildrenPath = (dir: string): string => {
  if (dir === "/") {
    return ROOT_CHILDREN_PATH;
  }
  if (GRAPH_RESOURCE_PREFIXES.some((prefix) => dir.startsWith(prefix))) {
    return dir;
  }
  return `/me/drive/root:${dir}:/children`;
};

import {
  connectionInput,
  cursor,
  directoryPath,
  limit,
  teamMemberId,
  userType,
} from "./common";
import { entryFilter, recursive } from "./files";
import { folderActions } from "./folders";
export const listFoldersInputs = {
  connection: connectionInput,
  path: {
    ...directoryPath,
    dataSource: undefined,
  },
  cursor,
  limit,
  recursive,
  userType: {
    ...userType,
    example: "admin",
  },
  teamMemberId,
  entryFilter,
};
export const listSharedFoldersInputs = {
  connection: connectionInput,
  path: {
    ...directoryPath,
    dataSource: undefined,
  },
  cursor,
  limit,
  folderActions,
};
export const listTeamFoldersInputs = {
  connection: connectionInput,
  path: {
    ...directoryPath,
    dataSource: undefined,
  },
  cursor,
  limit,
};

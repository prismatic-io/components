import { oneDriveConnection } from "./common";
import { dir } from "./files";

export const listDrivesDataSourceInputs = {
  oneDriveConnection,
};

export const listFilesInDirectoryInputs = {
  connection: oneDriveConnection,
  dir,
};

export const listFoldersInputs = {
  oneDriveConnection,
  dir,
};

export const listGroupsDataSourceInputs = {
  connection: oneDriveConnection,
};

export const listUsersInputs = {
  connection: oneDriveConnection,
};

export const selectSiteInputs = {
  connection: oneDriveConnection,
};

export const selectSubscriptionInputs = {
  connection: oneDriveConnection,
};

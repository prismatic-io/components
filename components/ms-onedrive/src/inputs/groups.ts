import { fetchAll, oneDriveConnection, pageLimit, pageToken } from "./common";

export const listGroupsInputs = {
  connection: oneDriveConnection,
  fetchAll,
  pageToken,
  pageLimit,
};

import { driveId as baseDriveId, connection, pageSize, query } from "./common";
const { dataSource: baseDriveIdDataSource, ...driveId } = baseDriveId;
export const selectDriveInputs = { connection };
export const selectFilesInputs = { connection, driveId, query, pageSize };
export const selectFolderInputs = { connection, driveId };

import { connectionInput, folderName, getArchived, getFolderId, getSpaceId } from "./common";

const spaceIdForCreate = getSpaceId(true);
const folderIdForDelete = getFolderId(true);
const folderIdForGet = getFolderId(true);
const spaceIdForList = getSpaceId(true);
const archivedForList = getArchived(false, "When true, includes archived Folders in the results.");
const folderIdForUpdate = getFolderId(true);

export const createFolderInputs = {
  connection: connectionInput,
  spaceId: spaceIdForCreate,
  folderName,
};

export const deleteFolderInputs = {
  connection: connectionInput,
  folderId: folderIdForDelete,
};

export const getFolderInputs = {
  connection: connectionInput,
  folderId: folderIdForGet,
};

export const listFoldersInputs = {
  connection: connectionInput,
  spaceId: spaceIdForList,
  archived: archivedForList,
};

export const updateFolderInputs = {
  connection: connectionInput,
  folderId: folderIdForUpdate,
  folderName,
};

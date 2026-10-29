import { connectionInput, path, shareName } from "./common";

export const listFolderInputs = {
  azureConnection: connectionInput,
  shareName,
  path: { ...path, required: false },
};

export const createFolderInputs = {
  azureConnection: connectionInput,
  shareName,
  path,
};

export const deleteFolderInputs = {
  azureConnection: connectionInput,
  shareName,
  path,
};

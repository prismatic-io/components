import { paginationInputs } from "./pagination";
import {
  assetExternalId,
  assetSearch,
  connection,
  projectId,
} from "./sharedInputs";

export const getWorkspaceProjectInputs = {
  connection,
  projectId,
};

export const listWorkspaceProjectAssetsInputs = {
  connection,
  ...paginationInputs,
  projectId,
  assetSearch,
  assetExternalId,
};

export const listWorkspaceProjectFoldersInputs = {
  connection,
  ...paginationInputs,
  projectId,
};

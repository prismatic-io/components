import { structuredObjectInput } from "@prismatic-io/spectral";
import { fetchAll, limit, page } from "./pagination";
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
  projectId,
  assetSearch,
  assetExternalId,
  fetchAll,
  pagination: structuredObjectInput({
    label: "Pagination",
    required: false,
    comments: "Page navigation controls.",
    inputs: { page, limit },
  }),
};
export const listWorkspaceProjectFoldersInputs = {
  connection,
  projectId,
  fetchAll,
  pagination: structuredObjectInput({
    label: "Pagination",
    required: false,
    comments: "Page navigation controls.",
    inputs: { page, limit },
  }),
};

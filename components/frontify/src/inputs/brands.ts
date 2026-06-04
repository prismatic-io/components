import { paginationInputs } from "./pagination";
import { brandId, connection } from "./sharedInputs";

export const getBrandInputs = {
  connection,
  brandId: {
    ...brandId,
    comments: "ID of the Brand to retrieve.",
  },
};

export const listBrandLibrariesInputs = {
  connection,
  ...paginationInputs,
  brandId: {
    ...brandId,
    comments: "ID of the Brand to retrieve Libraries for.",
  },
};

export const listBrandsInputs = {
  connection,
};

export const listBrandWorkspaceProjectsInputs = {
  connection,
  ...paginationInputs,
  brandId: {
    ...brandId,
    comments: "ID of the Brand to retrieve Workspace Projects for.",
  },
};

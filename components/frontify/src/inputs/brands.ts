import { structuredObjectInput } from "@prismatic-io/spectral";
import { fetchAll, limit, page } from "./pagination";
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
  brandId: {
    ...brandId,
    comments: "ID of the Brand to retrieve Libraries for.",
  },
  fetchAll,
  pagination: structuredObjectInput({
    label: "Pagination",
    required: false,
    comments: "Page navigation controls.",
    inputs: { page, limit },
  }),
};
export const listBrandsInputs = {
  connection,
};
export const listBrandWorkspaceProjectsInputs = {
  connection,
  brandId: {
    ...brandId,
    comments: "ID of the Brand to retrieve Workspace Projects for.",
  },
  fetchAll,
  pagination: structuredObjectInput({
    label: "Pagination",
    required: false,
    comments: "Page navigation controls.",
    inputs: { page, limit },
  }),
};

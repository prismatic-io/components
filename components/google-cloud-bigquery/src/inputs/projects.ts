import { connectionInput, fetchAll, projectId } from "./common";
import { paginationFields } from "./pagination";
export const getServiceAccountInputs = {
  connectionInput,
  projectId,
};
export const listProjectsInputs = {
  connectionInput,
  fetchAll,
  pagination: paginationFields,
};

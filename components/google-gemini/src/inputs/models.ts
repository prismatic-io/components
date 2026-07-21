import { structuredObjectInput } from "@prismatic-io/spectral";
import {
  connection,
  extraParameters,
  fetchAll,
  filter,
  model,
  pageSize,
  pageToken,
} from "./common";
const pagination = structuredObjectInput({
  label: "Pagination",
  required: false,
  comments: "Page size and page token for paginating through results.",
  inputs: { pageSize, pageToken },
});
export const getModelInfoInputs = {
  connection,
  modelName: model,
};
export const listModelsInputs = {
  fetchAll,
  pagination,
  filter,
  extraParameters,
  connection,
};

import { structuredObjectInput } from "@prismatic-io/spectral";
import {
  afterIdInput,
  beforeIdInput,
  connectionInput,
  fetchAllInput,
  limitInput,
  modelInput,
} from "./common";
export const getModelInputs = {
  connection: connectionInput,
  model: modelInput,
};
const paginationInput = structuredObjectInput({
  key: "pagination",
  label: "Pagination",
  comments: "Cursor and page-size controls for paging through results.",
  inputs: {
    beforeId: beforeIdInput,
    afterId: afterIdInput,
    limit: limitInput,
  },
});
export const listModelsInputs = {
  connection: connectionInput,
  fetchAll: fetchAllInput,
  pagination: paginationInput,
};

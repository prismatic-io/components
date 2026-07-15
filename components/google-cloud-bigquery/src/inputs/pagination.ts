import { input, structuredObjectInput, util } from "@prismatic-io/spectral";
import { maxResults, pageToken, startIndex } from "./common";
export const paginationFields = structuredObjectInput({
  label: "Pagination",
  required: false,
  comments: "Page navigation controls for the results.",
  inputs: { pageToken, maxResults },
});
export const paginationFieldsWithStartIndex = structuredObjectInput({
  label: "Pagination",
  required: false,
  comments: "Page navigation controls for the results.",
  inputs: { pageToken, maxResults, startIndex },
});
export const tableListPaginationFields = structuredObjectInput({
  label: "Pagination",
  required: false,
  comments: "Page navigation controls for the results.",
  inputs: {
    pageToken,
    maxResults: input({
      ...maxResults,
      required: false,
      clean: util.types.toString,
    }),
  },
});

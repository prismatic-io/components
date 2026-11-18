import { input, structuredObjectInput } from "@prismatic-io/spectral";
import { cleanStringInput } from "../util";
import { connection, fetchAll, odataParams } from "./common";

const detectedAppIdForGet = input({
  label: "Detected App ID",
  comments: "Unique Identifier for the detected app to retrieve.",
  example: "caf60db6-0db6-caf6-b60d-f6cab60df6ca",
  placeholder: "Enter detected app ID",
  type: "string",
  required: true,
  dataSource: "selectDetectedApp",
  clean: cleanStringInput,
});

export const getDetectedAppInputs = {
  connection,
  detectedAppId: detectedAppIdForGet,
};

const listPagination = structuredObjectInput({
  label: "Pagination",
  required: false,
  comments: "Page and page-size controls.",
  inputs: {
    $top: odataParams.$top,
    $skip: odataParams.$skip,
    $skipToken: odataParams.$skipToken,
  },
});

const listFilters = structuredObjectInput({
  label: "Filters",
  required: false,
  comments: "Optional query controls to sort and refine the results.",
  inputs: {
    $filter: odataParams.$filter,
    $select: odataParams.$select,
    $expand: odataParams.$expand,
    $orderBy: odataParams.$orderBy,
    $count: odataParams.$count,
    $search: odataParams.$search,
    $format: odataParams.$format,
  },
});

export const listDetectedAppsInputs = {
  connection,
  fetchAll,
  pagination: listPagination,
  filters: listFilters,
};

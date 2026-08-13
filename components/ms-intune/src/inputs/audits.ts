import { input, structuredObjectInput, util } from "@prismatic-io/spectral";
import {
  $filter,
  $orderBy,
  $skipToken,
  $top,
  connection,
  fetchAll,
} from "./common";
const odataAuditParams = {
  fetchAll,
  $filter,
  $orderBy,
  $top,
  $skipToken,
};
const microsoftEntraId = input({
  label: "Microsoft Entra ID",
  example: "705c034c-034c-705c-4c03-5c704c035c70",
  placeholder: "Enter audit log ID",
  comments:
    "The unique identifier for the Microsoft Entra audit log item to retrieve.",
  type: "string",
  required: true,
  clean: util.types.toString,
  dataSource: "selectDirectoryAudit",
});
export const getDirectoyAuditInputs = {
  connection,
  microsoftEntraId,
};
const listPagination = structuredObjectInput({
  label: "Pagination",
  required: false,
  comments: "Page and page-size controls.",
  inputs: {
    $top: odataAuditParams.$top,
    $skipToken: odataAuditParams.$skipToken,
  },
});
const listFilters = structuredObjectInput({
  label: "Filters",
  required: false,
  comments: "Optional query controls to sort and refine the results.",
  inputs: {
    $filter: odataAuditParams.$filter,
    $orderBy: odataAuditParams.$orderBy,
  },
});
export const listDirectoryAuditsInputs = {
  connection,
  fetchAll: odataAuditParams.fetchAll,
  pagination: listPagination,
  filters: listFilters,
};

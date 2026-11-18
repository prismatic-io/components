import { input, structuredObjectInput, util } from "@prismatic-io/spectral";
import {
  connection,
  fetchAll,
  intent,
  mobileAppId,
  odataParams,
  settings,
  target,
} from "./common";

const mobileAppAssignmentId = input({
  label: "Mobile App Assignment ID",
  comments: "Unique Identifier for the mobile app assignment to get.",
  example: "0177548a-548a-0177-8a54-77018a547701",
  placeholder: "Enter mobile app assignment ID",
  type: "string",
  required: true,
  clean: util.types.toString,
  dataSource: "selectMobileAppAssignment",
});

export const createMobileAppAssignmentInputs = {
  connection,
  mobileAppId: {
    ...mobileAppId,
    comments: "The ID of the mobile app to create the assignment for.",
  },
  intent,
  target,
  settings,
};

export const deleteMobileAppAssignmentInputs = {
  connection,
  mobileAppId: {
    ...mobileAppId,
    comments: "The ID of the mobile app to delete the assignment from.",
  },
  mobileAppAssignmentId: {
    ...mobileAppAssignmentId,
    comments: "The ID of the mobile app assignment to delete.",
  },
};

export const getMobileAppAssignmentInputs = {
  connection,
  mobileAppId,
  mobileAppAssignmentId,
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

export const listMobileAppAssignmentsInputs = {
  connection,
  mobileAppId,
  fetchAll,
  pagination: listPagination,
  filters: listFilters,
};

export const updateMobileAppAssignmentInputs = {
  connection,
  mobileAppId: {
    ...mobileAppId,
    comments: "The ID of the mobile app to update the assignment from.",
  },
  mobileAppAssignmentId: {
    ...mobileAppAssignmentId,
    comments: "The ID of the mobile app assignment to update.",
  },
  intent,
  target,
  settings,
};

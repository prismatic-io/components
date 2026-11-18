import { structuredObjectInput } from "@prismatic-io/spectral";
import {
  connection,
  fetchAll,
  groupId,
  intent,
  mobileAppId,
  odataParams,
  settings,
  target,
} from "./common";

export const getMobileAppInputs = {
  connection,
  mobileAppId,
};

export const assignMobileAppInputs = {
  connection,
  mobileAppId: {
    ...mobileAppId,
    comments: "Unique Identifier for the mobile app to assign.",
  },
  groupId: {
    ...groupId,
    comments:
      "The unique identifier of the group to assign the app to (UUID format). Used only for groupAssignmentTarget and exclusionGroupAssignmentTarget; ignored for other targets, such as allLicensedUsersAssignmentTarget and allDevicesAssignmentTarget.",
  },
  intent,
  target,
  settings,
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

export const listMobileAppsInputs = {
  connection,
  fetchAll,
  pagination: listPagination,
  filters: listFilters,
};

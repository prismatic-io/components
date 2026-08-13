import { input, structuredObjectInput, util } from "@prismatic-io/spectral";
import { connection, fetchAll, odataParams } from "./common";
export const mobileAppId = input({
  label: "Mobile App ID",
  comments: "Unique identifier for the mobile app (UUID format).",
  example: "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
  placeholder: "Enter mobile app ID",
  type: "string",
  required: true,
  clean: util.types.toString,
  dataSource: "selectMobileApp",
});
export const groupId = input({
  label: "Group ID",
  comments:
    "The unique identifier of the group to assign the app to (UUID format).",
  example: "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
  placeholder: "Enter group ID",
  type: "string",
  required: true,
  clean: util.types.toString,
  dataSource: "selectGroup",
});
export const intent = input({
  label: "Intent",
  comments:
    "The intent of the assignment for the managed app. A 'Required' option will force the app to be installed on the device. An 'Available' option will make the app available for the user to install. An 'Uninstall' option will remove the app from the device. An 'Available Without Enrollment' option will make the app available for the user to install without enrolling the device.",
  example: "available",
  model: [
    { label: "Available", value: "available" },
    { label: "Required", value: "required" },
    { label: "Uninstall", value: "uninstall" },
    {
      label: "Available Without Enrollment",
      value: "availableWithoutEnrollment",
    },
  ],
  type: "string",
  required: true,
  clean: util.types.toString,
});
export const target = input({
  label: "Target",
  type: "string",
  comments:
    "The mobile app assignment target type. Common values include allLicensedUsersAssignmentTarget, groupAssignmentTarget, allDevicesAssignmentTarget.",
  required: true,
  example: "microsoft.graph.allLicensedUsersAssignmentTarget",
  placeholder: "Enter target type",
  clean: util.types.toString,
});
export const settings = input({
  label: "Settings",
  type: "string",
  comments:
    "The mobile app assignment settings type. The value depends on the app platform (e.g., windowsUniversalAppXAppAssignmentSettings, iosLobAppAssignmentSettings).",
  required: true,
  example: "microsoft.graph.windowsUniversalAppXAppAssignmentSettings",
  placeholder: "Enter settings type",
  clean: util.types.toString,
});
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
  groupId,
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

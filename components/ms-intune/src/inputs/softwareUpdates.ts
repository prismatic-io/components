import { input, structuredObjectInput, util } from "@prismatic-io/spectral";
import { connection, fetchAll, odataSoftwareUpdatesParams } from "./common";
const listFilters = structuredObjectInput({
  label: "Filters",
  required: false,
  comments: "Optional query controls to sort and refine the results.",
  inputs: {
    $select: odataSoftwareUpdatesParams.$select,
    $expand: odataSoftwareUpdatesParams.$expand,
    $search: odataSoftwareUpdatesParams.$search,
    $format: odataSoftwareUpdatesParams.$format,
  },
});
export const listSoftwareUpdateStatusSummaryInputs = {
  connection,
  fetchAll,
  $skipToken: odataSoftwareUpdatesParams.$skipToken,
  filters: listFilters,
};
const displayName = input({
  label: "Display Name",
  comments: "The display name of the software update status summary.",
  type: "string",
  required: false,
  example: "Windows 11 Update Summary",
  placeholder: "Enter display name",
  clean: util.types.toString,
});
const compliantDeviceCount = input({
  label: "Compliant Device Count",
  comments:
    "The number of devices that are compliant with the software update.",
  type: "string",
  required: false,
  example: "1",
  placeholder: "Enter count",
  clean: util.types.toNumber,
});
const nonCompliantDeviceCount = input({
  label: "Non-Compliant Device Count",
  comments:
    "The number of devices that are not compliant with the software update.",
  type: "string",
  required: false,
  example: "1",
  placeholder: "Enter count",
  clean: util.types.toNumber,
});
const remediatedDeviceCount = input({
  label: "Remediated Device Count",
  comments: "The number of devices that have been remediated.",
  type: "string",
  required: false,
  example: "1",
  placeholder: "Enter count",
  clean: util.types.toNumber,
});
const errorDeviceCount = input({
  label: "Error Device Count",
  comments:
    "The number of devices that have an error with the software update.",
  type: "string",
  required: false,
  example: "1",
  placeholder: "Enter count",
  clean: util.types.toNumber,
});
const unknownDeviceCount = input({
  label: "Unknown Device Count",
  comments:
    "The number of devices that have an unknown status with the software update.",
  type: "string",
  required: false,
  example: "1",
  placeholder: "Enter count",
  clean: util.types.toNumber,
});
const conflictDeviceCount = input({
  label: "Conflict Device Count",
  comments:
    "The number of devices that have a conflict with the software update.",
  type: "string",
  required: false,
  example: "1",
  placeholder: "Enter count",
  clean: util.types.toNumber,
});
const notApplicableDeviceCount = input({
  label: "Not Applicable Device Count",
  comments:
    "The number of devices that are not applicable for the software update.",
  type: "string",
  required: false,
  example: "1",
  placeholder: "Enter count",
  clean: util.types.toNumber,
});
const compliantUserCount = input({
  label: "Compliant User Count",
  comments: "The number of users that are compliant with the software update.",
  type: "string",
  required: false,
  example: "1",
  placeholder: "Enter count",
  clean: util.types.toNumber,
});
const nonCompliantUserCount = input({
  label: "Non-Compliant User Count",
  comments:
    "The number of users that are not compliant with the software update.",
  type: "string",
  required: false,
  example: "1",
  placeholder: "Enter count",
  clean: util.types.toNumber,
});
const remediatedUserCount = input({
  label: "Remediated User Count",
  comments: "The number of users that have been remediated.",
  type: "string",
  required: false,
  example: "1",
  placeholder: "Enter count",
  clean: util.types.toNumber,
});
const errorUserCount = input({
  label: "Error User Count",
  comments: "The number of users that have an error with the software update.",
  type: "string",
  required: false,
  example: "1",
  placeholder: "Enter count",
  clean: util.types.toNumber,
});
const unknownUserCount = input({
  label: "Unknown User Count",
  comments:
    "The number of users that have an unknown status with the software update.",
  type: "string",
  required: false,
  example: "1",
  placeholder: "Enter count",
  clean: util.types.toNumber,
});
const conflictUserCount = input({
  label: "Conflict User Count",
  comments:
    "The number of users that have a conflict with the software update.",
  type: "string",
  required: false,
  example: "1",
  placeholder: "Enter count",
  clean: util.types.toNumber,
});
const notApplicableUserCount = input({
  label: "Not Applicable User Count",
  comments:
    "The number of users that are not applicable for the software update.",
  type: "string",
  required: false,
  example: "1",
  placeholder: "Enter count",
  clean: util.types.toNumber,
});
const deviceCounts = structuredObjectInput({
  label: "Device Counts",
  required: false,
  comments: "Device-level compliance status counts.",
  inputs: {
    compliantDeviceCount,
    nonCompliantDeviceCount,
    remediatedDeviceCount,
    errorDeviceCount,
    unknownDeviceCount,
    conflictDeviceCount,
    notApplicableDeviceCount,
  },
});
const userCounts = structuredObjectInput({
  label: "User Counts",
  required: false,
  comments: "User-level compliance status counts.",
  inputs: {
    compliantUserCount,
    nonCompliantUserCount,
    remediatedUserCount,
    errorUserCount,
    unknownUserCount,
    conflictUserCount,
    notApplicableUserCount,
  },
});
export const updateSoftwareUpdateStatusSummaryInputs = {
  connection,
  displayName,
  deviceCounts,
  userCounts,
};

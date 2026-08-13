import { input, structuredObjectInput } from "@prismatic-io/spectral";
import { cleanNumberInput, cleanStringInput } from "../util";
import { connection, fetchAll, odataParams } from "./common";
const displayName = input({
  label: "Display Name",
  comments:
    "The display name of the discovered application, as reported by the device agent.",
  example: "Microsoft Teams",
  placeholder: "Enter display name",
  type: "string",
  required: false,
  clean: cleanStringInput,
});
const version = input({
  label: "Version",
  comments:
    "The version string of the discovered application (e.g., semantic version or build number).",
  example: "1.5.0",
  placeholder: "Enter version",
  type: "string",
  required: false,
  clean: cleanStringInput,
});
const sizeInByte = input({
  label: "Size In Byte",
  comments: "Discovered application size in bytes.",
  example: "52428800",
  placeholder: "Enter size in bytes",
  type: "string",
  required: false,
  clean: cleanNumberInput,
});
const deviceCount = input({
  label: "Device Count",
  comments: "The number of devices that have installed this application.",
  example: "42",
  placeholder: "Enter device count",
  type: "string",
  required: false,
  clean: cleanNumberInput,
});
const publisher = input({
  label: "Publisher",
  comments:
    "Indicates the publisher of the discovered application. For example: 'Microsoft'. The default value is an empty string.",
  example: "Microsoft",
  placeholder: "Enter publisher name",
  default: "",
  type: "string",
  required: false,
  clean: cleanStringInput,
});
const platform = input({
  label: "Platform",
  comments:
    "Indicates the operating system / platform of the discovered application. Some possible values are Windows, iOS, macOS. The default value is unknown (0).",
  model: [
    {
      label: "Unknown",
      value: "unknown",
    },
    {
      label: "Windows",
      value: "windows",
    },
    {
      label: "Windows Mobile",
      value: "windowsMobile",
    },
    {
      label: "Windows Holographic",
      value: "windowsHolographic",
    },
    {
      label: "iOS",
      value: "ios",
    },
    {
      label: "macOS",
      value: "macOS",
    },
    {
      label: "Chrome OS",
      value: "chromeOS",
    },
    {
      label: "Android for Work",
      value: "androidOSP",
    },
    {
      label: "Android Device Administrator",
      value: "androidDeviceAdministrator",
    },
    {
      label: "Android Work Profile",
      value: "androidWorkProfile",
    },
    {
      label: "Android Dedicated and Fully Managed",
      value: "androidDedicatedAndFullyManaged",
    },
    {
      label: "Unknown Future Value",
      value: "unknownFutureValue",
    },
  ],
  default: "unknown",
  type: "string",
  required: false,
  clean: cleanStringInput,
});
export const createDetectedAppInputs = {
  connection,
  displayName,
  version,
  sizeInByte,
  deviceCount,
  publisher,
  platform,
};
const detectedAppIdForDelete = input({
  label: "Detected App ID",
  comments: "Unique Identifier for the detected app to delete.",
  example: "caf60db6-0db6-caf6-b60d-f6cab60df6ca",
  placeholder: "Enter detected app ID",
  type: "string",
  required: true,
  dataSource: "selectDetectedApp",
  clean: cleanStringInput,
});
export const deleteDetectedAppInputs = {
  connection,
  detectedAppId: detectedAppIdForDelete,
};
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
const detectedAppIdForUpdate = input({
  label: "Detected App ID",
  comments: "Unique Identifier for the detected app to update.",
  example: "caf60db6-0db6-caf6-b60d-f6cab60df6ca",
  placeholder: "Enter detected app ID",
  type: "string",
  required: true,
  dataSource: "selectDetectedApp",
  clean: cleanStringInput,
});
export const updateDetectedAppInputs = {
  connection,
  detectedAppId: detectedAppIdForUpdate,
  displayName,
  version,
  sizeInByte,
  deviceCount,
  publisher,
  platform,
};

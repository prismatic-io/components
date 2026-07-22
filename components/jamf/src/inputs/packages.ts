import { input, structuredObjectInput, util } from "@prismatic-io/spectral";
import { toOptionalBool, toOptionalNumber, toOptionalString } from "../util";
import {
  connection,
  fetchAll,
  filter,
  page,
  pageSize,
  resourceId,
  sort,
} from "./common";
const optionalBoolean = (label: string, comments: string) =>
  input({
    label,
    type: "string",
    required: false,
    model: [
      { label: "True", value: "true" },
      { label: "False", value: "false" },
    ],
    comments,
    clean: toOptionalBool,
  });
const packageName = input({
  label: "Package Name",
  type: "string",
  required: true,
  comments: "The display name of the package as shown in Jamf Pro.",
  clean: util.types.toString,
  placeholder: "Enter package name",
  example: "Google Chrome 120.0.pkg",
});
const packageFileName = input({
  label: "File Name",
  type: "string",
  required: true,
  comments:
    "The filename of the package file on the Jamf distribution point (e.g., GoogleChrome.pkg).",
  clean: util.types.toString,
  placeholder: "Enter file name",
  example: "GoogleChrome-120.0.6099.199.pkg",
});
const packageCategoryId = input({
  label: "Category ID",
  type: "string",
  required: false,
  dataSource: "selectCategory",
  comments: "The unique identifier of the category to assign to this package.",
  clean: toOptionalString,
  placeholder: "Enter category ID",
  example: "3",
});
const packageInfo = input({
  label: "Info",
  type: "string",
  required: false,
  comments:
    "A description of the package displayed to administrators in Jamf Pro.",
  clean: toOptionalString,
  placeholder: "Enter package info",
  example: "Google Chrome browser installer.",
});
const packageNotes = input({
  label: "Notes",
  type: "string",
  required: false,
  comments: "Internal notes about the package visible only to administrators.",
  clean: toOptionalString,
  placeholder: "Enter notes",
  example: "Downloaded from https://dl.google.com/chrome/mac/stable/",
});
const packagePriority = input({
  label: "Priority",
  type: "string",
  required: false,
  comments:
    "Installation priority from 1 (highest) to 20 (lowest). Defaults to 10.",
  clean: toOptionalNumber,
  placeholder: "Enter priority (1–20)",
  example: "10",
});
const packageRebootRequired = input({
  label: "Reboot Required",
  type: "boolean",
  required: false,
  comments: "Whether the device must reboot after installing this package.",
  clean: util.types.toBool,
});
const packageOsInstall = input({
  label: "OS Install",
  type: "boolean",
  required: false,
  comments: "Whether this package is an OS installer.",
  clean: util.types.toBool,
});
const packageFillUserTemplate = input({
  label: "Fill User Template",
  type: "boolean",
  required: false,
  comments: "Whether to fill the user template with the package contents.",
  clean: util.types.toBool,
});
const packageSuppressUpdates = input({
  label: "Suppress Updates",
  type: "boolean",
  required: false,
  comments: "Whether to suppress software updates during installation.",
  clean: util.types.toBool,
});
const packageSuppressEula = input({
  label: "Suppress EULA",
  type: "boolean",
  required: false,
  comments:
    "Whether to suppress the End User License Agreement during installation.",
  clean: util.types.toBool,
});
const packageSuppressFromDock = input({
  label: "Suppress From Dock",
  type: "boolean",
  required: false,
  comments:
    "Whether to suppress the package icon from the Dock during installation.",
  clean: util.types.toBool,
});
const packageSuppressRegistration = input({
  label: "Suppress Registration",
  type: "boolean",
  required: false,
  comments: "Whether to suppress the registration window during installation.",
  clean: util.types.toBool,
});
const createPackageAdditionalFields = structuredObjectInput({
  label: "Additional Fields",
  required: false,
  comments:
    "Additional optional fields: includes Priority, Info, Notes, Reboot Required, OS Install, Fill User Template, Suppress Updates, Suppress EULA, Suppress From Dock, and Suppress Registration.",
  inputs: {
    packagePriority,
    packageInfo,
    packageNotes,
    packageRebootRequired,
    packageOsInstall,
    packageFillUserTemplate,
    packageSuppressUpdates,
    packageSuppressEula,
    packageSuppressFromDock,
    packageSuppressRegistration,
  },
});
export const createPackageInputs = {
  connection,
  packageName,
  packageFileName,
  packageCategoryId,
  additionalFields: createPackageAdditionalFields,
};
const packageResourceId = {
  ...resourceId,
  label: "Package",
  comments: "The unique identifier of the package.",
  dataSource: "selectPackage",
};
export const deletePackageInputs = {
  connection,
  resourceId: packageResourceId,
};
export const getPackageInputs = { connection, resourceId: packageResourceId };
const pagination = structuredObjectInput({
  label: "Pagination",
  required: false,
  comments: "Page and page-size controls.",
  inputs: { page, pageSize },
});
export const listPackagesInputs = {
  connection,
  fetchAll,
  pagination,
  sort,
  filter,
};
const updatePackageName = {
  ...packageName,
  required: false,
  clean: toOptionalString,
};
const updatePackageFileName = {
  ...packageFileName,
  required: false,
  clean: toOptionalString,
};
const updatePackageRebootRequired = optionalBoolean(
  "Reboot Required",
  "Whether the device must reboot after installing this package.",
);
const updatePackageOsInstall = optionalBoolean(
  "OS Install",
  "Whether this package is an OS installer.",
);
const updatePackageFillUserTemplate = optionalBoolean(
  "Fill User Template",
  "Whether to fill the user template with the package contents.",
);
const updatePackageSuppressUpdates = optionalBoolean(
  "Suppress Updates",
  "Whether to suppress software updates during installation.",
);
const updatePackageSuppressEula = optionalBoolean(
  "Suppress EULA",
  "Whether to suppress the End User License Agreement during installation.",
);
const updatePackageSuppressFromDock = optionalBoolean(
  "Suppress From Dock",
  "Whether to suppress the package icon from the Dock during installation.",
);
const updatePackageSuppressRegistration = optionalBoolean(
  "Suppress Registration",
  "Whether to suppress the registration window during installation.",
);
const updatePackageAdditionalFields = structuredObjectInput({
  label: "Additional Fields",
  required: false,
  comments:
    "Additional optional fields: includes Package Name, File Name, Priority, Info, Notes, Reboot Required, OS Install, Fill User Template, Suppress Updates, Suppress EULA, Suppress From Dock, and Suppress Registration.",
  inputs: {
    packageName: updatePackageName,
    packageFileName: updatePackageFileName,
    packagePriority,
    packageInfo,
    packageNotes,
    packageRebootRequired: updatePackageRebootRequired,
    packageOsInstall: updatePackageOsInstall,
    packageFillUserTemplate: updatePackageFillUserTemplate,
    packageSuppressUpdates: updatePackageSuppressUpdates,
    packageSuppressEula: updatePackageSuppressEula,
    packageSuppressFromDock: updatePackageSuppressFromDock,
    packageSuppressRegistration: updatePackageSuppressRegistration,
  },
});
export const updatePackageInputs = {
  connection,
  resourceId: packageResourceId,
  packageCategoryId,
  additionalFields: updatePackageAdditionalFields,
};

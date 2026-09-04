import { input, util } from "@prismatic-io/spectral";
import { toOptionalBoolean, toOptionalString } from "../util";
import {
  connectionInput,
  creatorEmailInput,
  creatorFullNameInput,
  creatorGuidInput,
  descriptionInput,
  fetchAllInput,
  fileGuidInput,
  nameInput,
  numberInput,
  pagination,
  runDataInput,
  statusInput,
} from "./common";
const exportGuidInput = input({
  label: "Export GUID",
  type: "string",
  required: true,
  placeholder: "Enter export GUID",
  comments: "The GUID of the export definition.",
  example: "EX4KL5MN6OP7QR8ST9UV0WX1",
  clean: util.types.toString,
});
const exportRunGuidInput = input({
  label: "Export Run GUID",
  type: "string",
  required: true,
  placeholder: "Enter export run GUID",
  comments: "The GUID of the export run.",
  example: "EX4KL5MN6OP7QR8ST9UV0WX1",
  clean: util.types.toString,
});
const exportDataInput = input({
  label: "Export Data",
  type: "data",
  required: true,
  comments: "Export definition data including name, description, etc.",
  clean: util.types.toObject,
});
const latestCompletedInput = input({
  label: "Latest Completed",
  type: "string",
  required: false,
  placeholder: "Enter latest completed",
  comments:
    "Filters export runs by the latest completed flag. Accepted values are true and false; any other value omits the filter.",
  clean: toOptionalBoolean,
});
const viewInput = input({
  label: "View",
  type: "string",
  required: false,
  placeholder: "Enter view",
  comments:
    "Optional view parameter (e.g., 'withFiles' to include file information).",
  clean: toOptionalString,
});
export const createExportInputs = {
  connection: connectionInput,
  exportData: exportDataInput,
};
export const downloadExportRunFileContentInputs = {
  connection: connectionInput,
  exportGuid: exportGuidInput,
  exportRunGuid: exportRunGuidInput,
  fileGuid: { ...fileGuidInput, comments: "The GUID of the file to download." },
};
export const getExportInputs = {
  connection: connectionInput,
  exportGuid: {
    ...exportGuidInput,
    comments: "The GUID of the export definition to retrieve.",
    clean: util.types.toString,
  },
};
export const getExportRunInputs = {
  connection: connectionInput,
  exportGuid: exportGuidInput,
  exportRunGuid: {
    ...exportRunGuidInput,
    comments: "The GUID of the export run to retrieve.",
  },
};
export const listExportRunsInputs = {
  connection: connectionInput,
  exportGuid: exportGuidInput,
  number: {
    ...numberInput,
    label: "Export Number",
    placeholder: "Enter export number",
    comments: "Filter by export number.",
  },
  status: {
    ...statusInput,
    comments: "Filter by export run lifecycle status.",
  },
  latestCompleted: latestCompletedInput,
  fetchAll: fetchAllInput,
  pagination,
};
export const listExportsInputs = {
  connection: connectionInput,
  number: {
    ...numberInput,
    label: "Export Number",
    placeholder: "Enter export number",
    comments: "Filter by export number.",
  },
  name: {
    ...nameInput,
    label: "Export Name",
    placeholder: "Enter export name",
    comments: "Filter by export name.",
  },
  description: {
    ...descriptionInput,
    comments: "Filter by export description.",
  },
  creatorGuid: creatorGuidInput,
  creatorEmail: creatorEmailInput,
  creatorFullName: creatorFullNameInput,
  fetchAll: fetchAllInput,
  pagination,
};
export const getLatestCompletedExportRunInputs = {
  connection: connectionInput,
  exportGuid: exportGuidInput,
  view: viewInput,
};
export const runExportInputs = {
  connection: connectionInput,
  exportGuid: {
    ...exportGuidInput,
    comments: "The GUID of the export definition to run.",
  },
  runData: {
    ...runDataInput,
    comments: "Optional parameters for the export run.",
  },
};

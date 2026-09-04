import { input, util } from "@prismatic-io/spectral";
import { toOptionalNumber, toOptionalString } from "../util";
import {
  connectionInput,
  creatorEmailInput,
  creatorFullNameInput,
  creatorGuidInput,
  descriptionInput,
  fetchAllInput,
  fileContentInput,
  nameInput,
  numberInput,
  pagination,
  statusInput,
} from "./common";
const importDataInput = input({
  label: "Import Data",
  type: "data",
  required: true,
  comments: "Import definition data including name, description, etc.",
  clean: util.types.toObject,
});
const importGuidInput = input({
  label: "Import GUID",
  type: "string",
  required: true,
  placeholder: "Enter import GUID",
  comments: "The GUID of the import definition.",
  example: "IM4KL5MN6OP7QR8ST9UV0WX1",
  clean: util.types.toString,
});
const importRunGuidInput = input({
  label: "Import Run GUID",
  type: "string",
  required: true,
  placeholder: "Enter import run GUID",
  comments: "The GUID of the import run.",
  example: "IM4KL5MN6OP7QR8ST9UV0WX1",
  clean: util.types.toString,
});
const resourceInput = input({
  label: "Resource",
  type: "string",
  required: false,
  placeholder: "Enter resource",
  comments: "Filter by import resource type.",
  clean: toOptionalString,
});
const modeInput = input({
  label: "Mode",
  type: "string",
  required: false,
  placeholder: "Enter mode",
  comments: "Filter by import mode.",
  clean: toOptionalString,
});
const submitContentInput = input({
  label: "Submit Content File",
  type: "data",
  required: false,
  comments: "The submit content file to upload for the import (binary format).",
  clean: util.types.toData,
});
const submitFileTypeInput = input({
  label: "Submit File Type",
  type: "string",
  required: false,
  placeholder: "Enter submit file type",
  comments: "Type of the submit file being uploaded.",
  clean: toOptionalString,
});
const commitInput = input({
  label: "Commit",
  type: "boolean",
  required: false,
  default: "true",
  comments: "When true, the import run is committed. Defaults to true.",
  clean: util.types.toBool,
});
const submitWorksheetNameInput = input({
  label: "Submit Worksheet Name",
  type: "string",
  required: false,
  placeholder: "Enter submit worksheet name",
  comments: "Name of the worksheet to submit (for Excel files).",
  clean: toOptionalString,
});
const debugInput = input({
  label: "Debug",
  type: "boolean",
  required: false,
  default: "true",
  comments: "When true, debug mode is enabled. Defaults to true.",
  clean: util.types.toBool,
});
const actorInput = input({
  label: "Actor",
  type: "string",
  required: false,
  placeholder: "Enter actor",
  default: "10",
  comments: "Actor identifier (default 10).",
  example: "10",
  clean: toOptionalNumber,
});
export const createImportInputs = {
  connection: connectionInput,
  importData: importDataInput,
};
export const forceCompleteImportInputs = {
  connection: connectionInput,
  importGuid: importGuidInput,
  importRunGuid: {
    ...importRunGuidInput,
    comments: "The GUID of the import run to force complete.",
  },
};
export const getImportInputs = {
  connection: connectionInput,
  importGuid: {
    ...importGuidInput,
    comments: "The GUID of the import definition to retrieve.",
  },
};
export const getImportRunInputs = {
  connection: connectionInput,
  importGuid: importGuidInput,
  importRunGuid: {
    ...importRunGuidInput,
    comments: "The GUID of the import run to retrieve.",
  },
};
export const getImportRunErrorContentInputs = {
  connection: connectionInput,
  importGuid: importGuidInput,
  importRunGuid: importRunGuidInput,
};
export const getImportRunResultContentInputs = {
  connection: connectionInput,
  importGuid: importGuidInput,
  importRunGuid: importRunGuidInput,
};
export const listImportRunsInputs = {
  connection: connectionInput,
  importGuid: importGuidInput,
  number: {
    ...numberInput,
    label: "Run Number",
    placeholder: "Enter run number",
    comments: "Filter by run number.",
  },
  status: { ...statusInput, comments: "Filter by run status." },
  creatorGuid: creatorGuidInput,
  creatorFullName: creatorFullNameInput,
  creatorEmail: creatorEmailInput,
  fetchAll: fetchAllInput,
  pagination,
};
export const getImportRunSubmitContentInputs = {
  connection: connectionInput,
  importGuid: importGuidInput,
  importRunGuid: importRunGuidInput,
};
export const listImportsInputs = {
  connection: connectionInput,
  number: {
    ...numberInput,
    label: "Import Number",
    placeholder: "Enter import number",
    comments: "Filter by import number.",
  },
  name: {
    ...nameInput,
    label: "Import Name",
    placeholder: "Enter import name",
    comments: "Filter by import name.",
  },
  description: {
    ...descriptionInput,
    comments: "Filter by import description.",
  },
  resource: resourceInput,
  mode: modeInput,
  creatorGuid: creatorGuidInput,
  creatorEmail: creatorEmailInput,
  creatorFullName: creatorFullNameInput,
  fetchAll: fetchAllInput,
  pagination,
};
export const rerunImportInputs = {
  connection: connectionInput,
  importGuid: importGuidInput,
  importRunGuid: {
    ...importRunGuidInput,
    comments: "The GUID of the import run to rerun.",
  },
};
export const runImportInputs = {
  connection: connectionInput,
  importGuid: {
    ...importGuidInput,
    comments: "The GUID of the import definition to run.",
  },
  submitContent: submitContentInput,
  fileContent: {
    ...fileContentInput,
    comments:
      "Additional file content to upload for the import (binary format).",
  },
  submitFileType: submitFileTypeInput,
  commit: commitInput,
  submitWorksheetName: submitWorksheetNameInput,
  debug: debugInput,
  actor: actorInput,
};
export const updateImportInputs = {
  connection: connectionInput,
  importGuid: {
    ...importGuidInput,
    comments: "The GUID of the import definition to update.",
  },
  importData: {
    ...importDataInput,
    comments: "Updated import definition data.",
  },
};

import { input, util } from "@prismatic-io/spectral";
import {
  connectionInput,
  creatorFullNameInput,
  fetchAllInput,
  nameInput,
  pagination,
  runDataInput,
} from "./common";
const extractGuidInput = input({
  label: "Extract GUID",
  type: "string",
  required: true,
  placeholder: "Enter extract GUID",
  comments: "The GUID of the extract definition.",
  example: "ET4KL5MN6OP7QR8ST9UV0WX1",
  clean: util.types.toString,
});
const extractRunGuidInput = input({
  label: "Extract Run GUID",
  type: "string",
  required: true,
  placeholder: "Enter extract run GUID",
  comments: "The GUID of the extract run.",
  example: "ET4KL5MN6OP7QR8ST9UV0WX1",
  clean: util.types.toString,
});
const runFileAssociationGuidInput = input({
  label: "Run File Association GUID",
  type: "string",
  required: true,
  placeholder: "Enter run file association GUID",
  comments: "The GUID of the run file association to download.",
  example: "ET4KL5MN6OP7QR8ST9UV0WX1",
  clean: util.types.toString,
});
const extractDataInput = input({
  label: "Extract Data",
  type: "data",
  required: true,
  comments: "Extract definition data including name, description, etc.",
  clean: util.types.toObject,
});
const enabledInput = input({
  label: "Enabled",
  type: "boolean",
  required: false,
  comments: "When true, only enabled extracts are returned.",
  clean: util.types.toBool,
});
export const createExtractInputs = {
  connection: connectionInput,
  extractData: extractDataInput,
};
export const deleteExtractInputs = {
  connection: connectionInput,
  extractGuid: {
    ...extractGuidInput,
    comments: "The GUID of the extract definition to delete.",
  },
};
export const downloadExtractRunFileContentInputs = {
  connection: connectionInput,
  extractGuid: extractGuidInput,
  extractRunGuid: extractRunGuidInput,
  runFileAssociationGuid: runFileAssociationGuidInput,
};
export const getExtractInputs = {
  connection: connectionInput,
  extractGuid: {
    ...extractGuidInput,
    comments: "The GUID of the extract definition to retrieve.",
  },
};
export const getExtractRunInputs = {
  connection: connectionInput,
  extractGuid: extractGuidInput,
  extractRunGuid: {
    ...extractRunGuidInput,
    comments: "The GUID of the extract run to retrieve.",
  },
};
export const listExtractRunFilesInputs = {
  connection: connectionInput,
  extractGuid: extractGuidInput,
  extractRunGuid: extractRunGuidInput,
};
export const listExtractRunsInputs = {
  connection: connectionInput,
  extractGuid: extractGuidInput,
};
export const listExtractsInputs = {
  connection: connectionInput,
  name: {
    ...nameInput,
    label: "Extract Name",
    placeholder: "Enter extract name",
    comments: "Filter by extract name.",
  },
  enabled: enabledInput,
  creatorFullName: {
    ...creatorFullNameInput,
    comments:
      "Filter by the full name of the integration user who set up the extract.",
  },
  fetchAll: fetchAllInput,
  pagination,
};
export const getLatestCompletedExtractRunInputs = {
  connection: connectionInput,
  extractGuid: extractGuidInput,
};
export const runExtractInputs = {
  connection: connectionInput,
  extractGuid: {
    ...extractGuidInput,
    comments: "The GUID of the extract definition to run.",
  },
  runData: {
    ...runDataInput,
    comments: "Optional parameters for the extract run.",
  },
};
export const updateExtractInputs = {
  connection: connectionInput,
  extractGuid: {
    ...extractGuidInput,
    comments: "The GUID of the extract definition to update.",
  },
  extractData: {
    ...extractDataInput,
    comments: "Updated extract definition data.",
  },
};

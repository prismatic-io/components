import { input, util } from "@prismatic-io/spectral";
import { connectionInput, fileIdInput, offsetPagination } from "./common";
import { cleanString } from "../util";
const file = input({
  label: "File",
  type: "data",
  required: true,
  comments: "The file to upload - either string contents or a binary file",
  clean: util.types.toBufferDataPayload,
});
const fileName = input({
  label: "File Name",
  type: "string",
  required: true,
  comments: "The name of the file to upload.",
  example: "contract.pdf",
  placeholder: "Enter file name",
  clean: util.types.toString,
});
const entityType = input({
  label: "Entity Type",
  comments: "The type of entity to attach the file to",
  type: "string",
  required: true,
  model: [
    { label: "Deal", value: "deal" },
    { label: "Person", value: "person" },
    { label: "Organization", value: "org" },
    { label: "Product", value: "product" },
    { label: "Activity", value: "activity" },
    { label: "Lead", value: "lead" },
  ],
  clean: util.types.toString,
});
const entityId = input({
  label: "Entity ID",
  type: "string",
  required: true,
  comments:
    "The numerical ID of the deal, person, org, product or activity, or UUID of the lead to associate this file with.",
  example: "123",
  placeholder: "Enter Entity ID",
  clean: util.types.toString,
});
const updateFileName = input({
  label: "File Name",
  type: "string",
  clean: cleanString,
  comments: "The new name for the file.",
  example: "updated-contract.pdf",
  placeholder: "Enter file name",
});
const description = input({
  label: "Description",
  type: "string",
  clean: cleanString,
  comments: "A text description of the file.",
  example: "Signed contract for Q1 deal",
  placeholder: "Enter file description",
});
export const addFileInputs = {
  connection: connectionInput,
  file,
  fileName,
  entityType,
  entityId,
};
export const updateFileInputs = {
  connection: connectionInput,
  id: fileIdInput,
  name: updateFileName,
  description,
};
export const getFilesInputs = {
  connection: connectionInput,
  pagination: offsetPagination,
};
export const deleteFileInputs = {
  connection: connectionInput,
  id: fileIdInput,
};
export const getFileInputs = {
  connection: connectionInput,
  id: fileIdInput,
};
export const downloadFileInputs = {
  connection: connectionInput,
  id: fileIdInput,
};

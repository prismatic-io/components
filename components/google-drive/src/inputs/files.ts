import { input, structuredObjectInput, util } from "@prismatic-io/spectral";
import { cleanStringInput } from "../util";
import {
  connection,
  driveId,
  fetchAll,
  fields,
  folderId,
  pagination,
  query,
  searchQuery,
} from "./common";
export const fileId = input({
  label: "File ID",
  placeholder: "Enter File ID",
  type: "string",
  required: true,
  example: "1a2b3c4d5e6f7g8h9i0j",
  clean: util.types.toString,
  comments:
    "A unique opaque ID for each file. File IDs are stable throughout the life of the file, even if the file name changes.",
  dataSource: "selectFiles",
});
export const fileName = input({
  label: "File Name",
  placeholder: "Enter file name",
  type: "string",
  required: false,
  example: "My Document.pdf",
  comments: "The name of the file.",
  clean: cleanStringInput,
});
export const fileContent = input({
  label: "File Content",
  placeholder: "Enter file content",
  type: "string",
  required: true,
  example: "My Example File Contents",
  comments:
    "The binary or text body of the file. Images, videos, text, and PDF files can be stored in Google Drive.",
});
export const exportType = input({
  label: "Preferred Export Type",
  type: "string",
  required: false,
  placeholder: "Enter MIME type",
  comments:
    "The MIME type to export the file as. If not compatible, the first available export type will be used. Only required for non-binary files.",
  example: "application/pdf",
  clean: cleanStringInput,
});
export const metadataFields = input({
  label: "Fields",
  type: "string",
  required: true,
  comments: "A comma separated list of fields to return in the response.",
  example: "id,name,mimeType,thumbnailLink",
  placeholder: "Enter comma separated fields",
  clean: util.types.toString,
});
export const filesContainingSearchQuery = input({
  label: "Files Containing Search Query",
  type: "boolean",
  required: false,
  comments:
    "When true, searches for files that contain the provided search query in their name.",
  clean: util.types.toBool,
  default: "false",
});
export const filters = structuredObjectInput({
  label: "Filters",
  required: false,
  comments: "Optional query controls to sort and refine the results.",
  inputs: { searchQuery, filesContainingSearchQuery, query },
});
export const copyFileInputs = { connection, fileId, fileName, folderId };
export const createFileInputs = {
  connection,
  folderId: { ...folderId, label: "Parent Folder ID" },
  fileContent,
  fileName: { ...fileName, required: true, clean: util.types.toString },
  fields,
};
export const deleteFileInputs = { connection, fileId, fields };
export const getFileInputs = { connection, fileId, exportType };
export const getFileMetadataInputs = { connection, fileId, metadataFields };
export const listExportTypesInputs = { connection, fileId };
export const listFilesInputs = {
  connection,
  driveId,
  fetchAll,
  pagination,
  fields,
  query,
};
export const moveFileInputs = {
  connection,
  fileId,
  folderId: { ...folderId, required: true, clean: util.types.toString },
};
export const searchFilesInputs = {
  connection,
  driveId,
  filters,
  folderId: { ...folderId, label: "Parent Folder ID" },
  fields,
  fetchAll,
  pagination,
};
export const updateFileInputs = {
  connection,
  fileId,
  fileContent: { ...fileContent, required: false },
  fileName,
  fields,
};

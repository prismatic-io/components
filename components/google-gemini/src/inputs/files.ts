import { input, util } from "@prismatic-io/spectral";
import { cleanString } from "../util";
import { connection, fetchAll, pageSize, pageToken } from "./common";

const fileName = input({
  label: "File Name",
  type: "string",
  required: true,
  comments:
    "The unique resource name assigned by the API to identify the file.",
  example: "files/abc123def456",
  dataSource: "selectFile",
  clean: util.types.toString,
});

const file = input({
  label: "File",
  type: "data",
  required: true,
  comments:
    "The file content to upload. This can be a file reference from a previous step.",
  clean: util.types.toData,
});

const displayName = input({
  label: "Display Name",
  type: "string",
  required: false,
  comments:
    "A human-readable label for the file shown in the Google AI interface.",
  example: "test.txt",
  placeholder: "Enter display name",
  clean: cleanString,
});

export const deleteFileInputs = {
  fileName: {
    ...fileName,
    comments:
      "The unique resource name of the file to delete from the service.",
  },
  connection,
};

export const getFileInputs = {
  fileName,
  connection,
};

export const listFilesInputs = {
  fetchAll,
  pageSize,
  pageToken,
  connection,
};

export const uploadFileInputs = {
  file,
  fileName,
  displayName,
  connection,
};

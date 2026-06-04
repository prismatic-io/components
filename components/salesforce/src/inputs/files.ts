import { input, util } from "@prismatic-io/spectral";
import { connectionInput, version } from "./common";

export const file = input({
  label: "File",
  type: "data",
  required: true,
  comments: "The binary file data to upload as a Salesforce Content Version.",
  clean: util.types.toData,
});

const pathOnClient = input({
  label: "Path On Client",
  type: "string",
  required: true,
  placeholder: "Enter file path (including extension)",
  comments:
    "The complete path of the document. One of the fields that determines the FileType. Specify a complete path including the path extension in order for the document to be visible in the Preview tab.",
  clean: util.types.toString,
  example: "path/to/file.csv",
});

const contentDocumentId = input({
  label: "Content Version ID",
  type: "string",
  required: true,
  comments: "The unique identifier of the ContentVersion record for the file to retrieve.",
  clean: util.types.toString,
  example: "0697000000K2g5AAAR",
  placeholder: "Enter content version ID",
});

export const attachmentId = input({
  label: "Attachment ID",
  type: "string",
  required: true,
  placeholder: "Enter attachment ID",
  comments: "The ID of the attachment to retrieve.",
  clean: util.types.toString,
  example: "0697000000K2g5AAAR",
});

export const fileName = input({
  label: "File Name",
  comments: "The name of the file to upload, including the file extension.",
  type: "string",
  example: "file.pdf",
  placeholder: "Enter file name",
  required: true,
  clean: util.types.toString,
});

export const fileContent = input({
  label: "File Contents",
  placeholder: "Text or binary data from previous step",
  type: "data",
  required: true,
  example: "Hello World",
  comments: "Reference a file from a previous step, or enter plain text here.",
  clean: util.types.toData,
});

export const fileId = input({
  label: "File ID",
  placeholder: "Enter file ID",
  comments: "The unique identifier of the file to retrieve.",
  type: "string",
  example: "0697000000K2g5AAAR",
  required: true,
  clean: (value: unknown): string => {
    const fileId = util.types.toString(value).trim();
    if (fileId === "") {
      throw new Error("Must specify a valid Record Type");
    }
    return fileId;
  },
});

export const uploadFileInputs = {
  version,
  connection: connectionInput,
  file,
  pathOnClient,
};

export const getFileInputs = {
  contentDocumentId,
  version,
  connection: connectionInput,
};

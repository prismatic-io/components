import { input, util } from "@prismatic-io/spectral";
import { FolderType } from "../../types/folderTypes";
import { cleanArrayCodeInput, cleanStringInput } from "../../util";

export const folderType = input({
  label: "Folder Type",
  type: "string",
  required: true,
  model: [
    { label: "Shared", value: FolderType.SHARED },
    { label: "Confidential", value: FolderType.CONFIDENTIAL },
    { label: "Custom", value: FolderType.CUSTOM },
  ],
  comments: "The access level classification for the document folder.",
  placeholder: "Select folder type",
  clean: util.types.toString,
});

export const folderId = input({
  label: "Folder ID",
  type: "string",
  required: false,
  comments: "Required if folder type is 'Custom'. The ID of the custom folder.",
  example: "1044123",
  dataSource: "selectFolder",
  placeholder: "Enter folder ID",
  clean: cleanStringInput,
});

export const documentId = input({
  label: "Document ID",
  type: "string",
  required: true,
  comments: "The unique identifier for the document.",
  example: "23278123",
  placeholder: "Enter document ID",
  clean: util.types.toString,
});

export const documentName = input({
  label: "Document Name",
  type: "string",
  required: true,
  comments:
    "The display name for the uploaded document, including file extension.",
  example: "document.pdf",
  placeholder: "Enter document name",
  clean: util.types.toString,
});

export const documentUrl = input({
  label: "Document URL",
  type: "string",
  required: true,
  comments: "The URL pointing to the document to upload.",
  example: "https://example.com/documents/file.pdf",
  placeholder: "Enter document URL",
  clean: util.types.toString,
});

export const fileData = input({
  label: "File Data",
  type: "data",
  required: true,
  comments:
    "The binary data of the file to upload. This should be a reference to a previous action that returns file data.",
  clean: util.types.toBufferDataPayload,
});

export const fileName = input({
  label: "File Name",
  type: "string",
  required: true,
  comments:
    "The desired file name for the uploaded document, including extension.",
  example: "document.pdf",
  placeholder: "Enter file name",
  clean: util.types.toString,
});

export const tags = input({
  label: "Tags",
  type: "code",
  language: "json",
  required: false,
  comments: "An array of tags to attach to the document in Bob.",
  example: JSON.stringify(["tag1", "tag2"]),
  clean: (value) => cleanArrayCodeInput(value, "Tags"),
});

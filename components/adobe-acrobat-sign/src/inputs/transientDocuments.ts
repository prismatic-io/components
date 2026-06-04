import { input, util } from "@prismatic-io/spectral";
import { connection } from "./common";

const fileName = input({
  label: "File Name",
  type: "string",
  required: true,
  placeholder: "Enter file name",
  example: "contract.pdf",
  clean: util.types.toString,
  comments:
    "A name for the document being uploaded. Maximum number of characters in the name is restricted to 255.",
});

const mimeType = input({
  label: "Mime Type",
  type: "string",
  required: false,
  placeholder: "Enter MIME type",
  example: "application/pdf",
  clean: util.types.toString,
  comments:
    "The MIME type of the document being uploaded. If not specified here then MIME type is picked up from the file object. If MIME type is not present there either then MIME type is inferred from the file extension.",
});

const file = input({
  label: "File",
  type: "data",
  required: true,
  placeholder: "File from previous step",
  clean: util.types.toData,
  comments:
    "The file part of the multipart request for document upload. You can upload only one file at a time.",
});


export const label = input({
  label: "Document Label",
  type: "string",
  required: false,
  placeholder: "Enter document label",
  example: "Contract Document",
  clean: util.types.toString,
  comments:
    "The unique label value of a file info element. In case of custom workflow this will map a file to corresponding file element in workflow definition. This must be specified in case of custom workflow agreement creation request.",
});

export const createTransientDocumentInputs = {
  connection,
  file,
  mimeType,
  fileName,
};

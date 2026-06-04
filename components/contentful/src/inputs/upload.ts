import { input, util } from "@prismatic-io/spectral";
import { connection, environmentId, spaceId } from "./common";

const uploadId = input({
  label: "Upload ID",
  type: "string",
  comments: "The unique identifier for the upload.",
  example: "2DNvIbYNELgqLJUkgTeIOV",
  placeholder: "Enter upload ID",
  required: true,
  clean: util.types.toString,
});

const fileContents = input({
  label: "File Contents",
  placeholder: "Output data from previous step",
  type: "data",
  required: true,
  comments:
    "The contents to write to a file. This can be a string of text, it can be binary data that was generated in a previous step.",
  example: "My File Contents",
  clean: util.types.toData,
});

export const deleteUploadInputs = {
  connection,
  spaceId,
  environmentId,
  uploadId,
};

export const getUploadInputs = {
  connection,
  spaceId,
  environmentId,
  uploadId,
};

export const uploadFileInputs = {
  connection,
  spaceId,
  fileContents,
};

import { input } from "@prismatic-io/spectral";
import { connectionInput, path } from "./common";
export const fileContents = input({
  label: "File Contents",
  placeholder: "Select file data from previous step",
  type: "data",
  required: true,
  comments:
    "The file content to upload. Accepts text, binary data (images, PDFs), or output from a previous step.",
  example: "My File Contents",
});
export const downloadFileInputs = {
  path,
  boxConnection: connectionInput,
};
export const getFileDownloadUrlInputs = {
  path,
  boxConnection: connectionInput,
};
export const uploadFileInputs = {
  path,
  fileContents,
  boxConnection: connectionInput,
};

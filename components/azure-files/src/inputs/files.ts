import { input, util } from "@prismatic-io/spectral";
import { connectionInput, path, shareName } from "./common";

export const fileContents = input({
  label: "File Contents",
  placeholder: "Output data from previous step",
  type: "data",
  required: true,
  comments:
    "The contents to write to the file. This can be a string of text or binary data (like an image or PDF) that was generated in a previous step.",
  example: "My File Contents",
  clean: util.types.toData,
});

export const fromPath = input({
  label: "From Path",
  placeholder: "Enter source object path",
  type: "string",
  required: true,
  comments:
    "The file path of the source object within the share. Do not include a leading slash.",
  example: "path/to/source/file.txt",
  clean: util.types.toString,
});

export const toPath = input({
  label: "To Path",
  placeholder: "Enter destination object path",
  type: "string",
  required: true,
  comments:
    "The file path of the destination object within the share. Do not include a leading slash.",
  example: "path/to/destination/file.txt",
  clean: util.types.toString,
});

export const sourceUrlInput = input({
  label: "Source URL",
  placeholder: "Enter source file URL",
  type: "string",
  required: true,
  comments:
    "The URL where the source file currently resides. This endpoint must be accessible via an unauthenticated HTTP GET request, and the response must return a content-length header.",
  example: "https://example.com/path/to/file.txt",
  clean: util.types.toString,
});

export const uploadFileInputs = {
  azureConnection: connectionInput,
  shareName,
  path,
  fileContents,
};

export const saveFromUrlInputs = {
  azureConnection: connectionInput,
  shareName,
  path,
  sourceUrl: sourceUrlInput,
};

export const downloadFileInputs = {
  azureConnection: connectionInput,
  shareName,
  path,
};

export const deleteFileInputs = {
  azureConnection: connectionInput,
  shareName,
  path,
};

export const copyFileInputs = {
  azureConnection: connectionInput,
  shareName,
  fromPath,
  toPath,
};

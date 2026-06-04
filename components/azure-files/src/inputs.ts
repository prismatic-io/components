import { input, util } from "@prismatic-io/spectral";

export const shareName = input({
  label: "Share Name",
  placeholder: "Share Name",
  type: "string",
  required: true,
  comments:
    "An Azure Files 'share' is a container where files are stored. You can create a share from within the Azure console. Share names contain only letters, numbers, and dashes.",
  example: "my-file-share",
  clean: util.types.toString,
});

export const path = input({
  label: "Path",
  placeholder: "Object Path",
  type: "string",
  required: true,
  comments:
    "An object in Azure Files is a file that is saved in a 'share'. This represents the object's file path. Do not include a leading /",
  example: "path/to/file.txt",
  clean: util.types.toString,
});

export const fromPath = input({
  label: "From Path",
  placeholder: "From Path",
  type: "string",
  required: true,
  comments:
    "An object in Azure Files is a file that is saved in a 'share'. This represents the source object's file path. Do not include a leading /",
  example: "path/to/source/file.txt",
  clean: util.types.toString,
});

export const toPath = input({
  label: "To Path",
  placeholder: "To Path",
  type: "string",
  required: true,
  comments:
    "An object in Azure Files is a file that is saved in a 'share'. This represents the destination object's file path. Do not include a leading /",
  example: "path/to/destination/file.txt",
  clean: util.types.toString,
});

export const fileContents = input({
  label: "File Contents",
  placeholder: "Output data from previous step",
  type: "data",
  required: true,
  comments:
    "The contents to write to a file. This can be a string of text, it can be binary data (like an image or PDF) that was generated in a previous step.",
  example: "My File Contents",
  clean: util.types.toData,
});

export const connectionInput = input({
  label: "Connection",
  type: "connection",
  required: true,
});

export const sourceUrlInput = input({
  label: "Source URL",
  type: "string",
  required: true,
  comments:
    "The URL where the source file currently resides. This endpoint must be accessible via an unauthenticated HTTP GET request, and the response must return a content-length header.",
  clean: util.types.toString,
});

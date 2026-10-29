import { input, util } from "@prismatic-io/spectral";

export const connectionInput = input({
  label: "Connection",
  type: "connection",
  required: true,
});

export const shareName = input({
  label: "Share Name",
  placeholder: "Enter share name",
  type: "string",
  required: true,
  comments:
    "The name of the Azure Files share, a container where files are stored. A share can be created from within the Azure console. Share names contain only letters, numbers, and dashes.",
  example: "my-file-share",
  clean: util.types.toString,
});

export const path = input({
  label: "Path",
  placeholder: "Enter object path",
  type: "string",
  required: true,
  comments:
    "The file path of the object within the share. Do not include a leading slash.",
  example: "path/to/file.txt",
  clean: util.types.toString,
});

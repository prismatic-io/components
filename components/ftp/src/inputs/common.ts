import { input, util } from "@prismatic-io/spectral";
import { cleanString } from "../util/clean";
export const connection = input({
  label: "Connection",
  type: "connection",
  required: true,
  comments: "The FTP connection to use.",
});
export const path = input({
  label: "Path",
  placeholder: "Enter directory path",
  type: "string",
  required: true,
  comments:
    "The directory path on the FTP server to monitor for new or modified files.",
  example: "/path/to/directory",
  clean: util.types.toString,
});
export const pattern = input({
  label: "Pattern",
  default: "*",
  placeholder: "Enter file pattern",
  type: "string",
  required: false,
  comments:
    "A glob-style pattern to filter files by name. Use wildcards like *.csv or report_*.txt to match specific file types or naming conventions.",
  example: "*.csv",
  clean: cleanString,
});
export const recursive = input({
  label: "Include Subfolders",
  comments:
    "When true, recursively creates any missing directories in the path.",
  type: "boolean",
  required: false,
  default: "true",
  clean: util.types.toBool,
});
export const includeSubdirectories = input({
  label: "Include Subdirectories",
  default: "false",
  type: "boolean",
  required: false,
  comments:
    "When true, recursively monitors files in all subdirectories. When false, only monitors files in the specified directory.",
  clean: util.types.toBool,
});

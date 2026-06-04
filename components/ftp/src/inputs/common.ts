import { input, util } from "@prismatic-io/spectral";

export const connection = input({
  label: "Connection",
  type: "connection",
  required: true,
});

export const verbose = input({
  label: "Verbose Logging",
  placeholder: "Enable Verbose Logging",
  default: "false",
  comments: "Enables verbose logging for debugging purposes.",
  type: "boolean",
  example: "false",
  clean: util.types.toBool,
});

export const path = input({
  label: "Path",
  placeholder: "Path of directory on FTP server to monitor",
  type: "string",
  required: true,
  comments:
    "Path of directory on FTP server to monitor for new or modified files.",
  example: "/path/to/directory",
  clean: util.types.toString,
});

export const pattern = input({
  label: "Pattern",
  default: "*",
  placeholder: "Glob-style string for filtering specific files",
  type: "string",
  required: false,
  comments: "Glob-style string for filtering specific files.",
  example: "*.csv",
  clean: util.types.toString,
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

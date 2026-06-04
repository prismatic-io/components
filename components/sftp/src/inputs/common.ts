import { input, util } from "@prismatic-io/spectral";

export const connection = input({
  label: "Connection",
  type: "connection",
  required: true,
  comments: "The SFTP connection to use.",
});

export const path = input({
  label: "Path",
  placeholder: "Enter path",
  type: "string",
  required: true,
  comments: "The path of the directory on the SFTP server to list files from.",
  example: "/path/to/directory/",
  clean: util.types.toString,
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

export const returnBuffer = input({
  label: "Return Buffer",
  type: "boolean",
  required: true,
  default: "false",
  comments:
    "When true, treats the file as a binary file with content type 'application/octet-stream', even if it is a text file. This is helpful if you are processing non-UTF-8 text files, as the runner assumes text files are UTF-8.",
  clean: util.types.toBool,
});

export const outputPath = input({
  label: "Path",
  placeholder: "Enter path",
  type: "string",
  required: true,
  comments: "The path to the file on the SFTP server.",
  example: "/we/love/commas.csv",
  clean: util.types.toString,
});

export const outputPathAppend = input({
  ...outputPath,
  placeholder: "Enter path",
  comments: "The path on the SFTP server where data will be appended.",
  example: "/path/to/remote/file.txt",
});

export const data = input({
  label: "Data",
  placeholder: "Enter data",
  type: "text",
  required: true,
  comments: "The text or data to write into the file.",
  
  
  
  
  clean: (value) =>
    util.types.isData(value)
      ? util.types.toData(value).data
      : Buffer.from(typeof value === "string" ? value : JSON.stringify(value)),
});

export const dataAppend = input({
  ...data,
  placeholder: "Enter data",
  comments: "The text or data to append to the file.",
});

export const pattern = input({
  label: "Pattern",
  default: "*",
  placeholder: "Enter pattern",
  type: "string",
  required: false,
  comments: "The glob-style pattern for filtering files (e.g., *.txt).",
  example: "*.txt",
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

export const includeDirectories = input({
  label: "Include Directories",
  default: "false",
  type: "boolean",
  required: false,
  comments:
    "When true, lists directories in addition to files. When false, only lists files.",
  clean: util.types.toBool,
});

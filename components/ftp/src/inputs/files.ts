import { input, util } from "@prismatic-io/spectral";
import { connection } from "./common";
const returnBuffer = input({
  label: "Return Buffer",
  type: "boolean",
  required: true,
  default: "false",
  comments:
    "When true, treats the file as a binary file with content type 'application/octet-stream', even if it is a text file. This is helpful if you are processing non-UTF-8 text files, as the runner assumes text files are UTF-8.",
  clean: util.types.toBool,
});
const readFilePath = input({
  label: "Path",
  placeholder: "Enter file path",
  type: "string",
  required: true,
  comments: "The full path of the file on the FTP server to read.",
  example: "/path/to/file.txt",
  clean: util.types.toString,
});
const deleteFilePath = input({
  label: "Path",
  placeholder: "Enter file path",
  type: "string",
  required: true,
  comments: "The full path of the file on the FTP server to delete.",
  example: "/path/to/file.txt",
  clean: util.types.toString,
});
const listDirectoryPath = input({
  label: "Path",
  placeholder: "Enter directory path",
  type: "string",
  required: true,
  comments: "The full path of the directory on the FTP server to list.",
  example: "/path/to/directory",
  clean: util.types.toString,
});
const sourcePath = input({
  label: "Source Path",
  placeholder: "Enter source file path",
  type: "string",
  required: true,
  comments: "The current path of the file on the FTP server to move.",
  example: "/my/starting/path.txt",
  clean: util.types.toString,
});
const destinationPath = input({
  label: "Destination Path",
  placeholder: "Enter destination file path",
  type: "string",
  required: true,
  comments: "The new path where the file will be moved on the FTP server.",
  example: "/my/destination/path.txt",
  clean: util.types.toString,
});
const outputPath = input({
  label: "Path",
  placeholder: "Enter file path",
  type: "string",
  required: true,
  comments: "The full path on the FTP server where the file will be written.",
  example: "/we/love/commas.csv",
  clean: util.types.toString,
});
const data = input({
  label: "Data",
  placeholder: "Enter data to write",
  type: "text",
  required: true,
  comments: "The text or binary data to write to the file on the FTP server.",
  clean: (value) => util.types.toData(value).data,
});
export const readFileInputs = {
  connection,
  inputPath: readFilePath,
  returnBuffer,
};
export const deleteFileInputs = {
  connection,
  path: deleteFilePath,
};
export const listDirectoryInputs = {
  connection,
  path: listDirectoryPath,
};
export const moveFileInputs = {
  connection,
  sourcePath,
  destinationPath,
};
export const writeFileInputs = {
  connection,
  outputPath,
  data,
};

import { input, structuredObjectInput, util } from "@prismatic-io/spectral";
import { BOTH_ENTRY_FILTER } from "../constants";
import { cleanPathArray, cleanString, cleanStringWithTag } from "../util";
import {
  connectionInput,
  directoryPath,
  fetchAll,
  pagination,
  path,
  teamMemberId,
  userType,
} from "./common";
export const fileName = input({
  label: "File Name",
  placeholder: "Enter the file name",
  type: "string",
  required: false,
  comments: "The name of a file within a Dropbox share.",
  example: "fileName.txt",
  clean: cleanString,
});
export const fromPath = input({
  label: "From Path",
  placeholder: "Enter the source path",
  type: "string",
  required: true,
  comments:
    "The location of a source file within a Dropbox share. Include a leading /.",
  example: "/path/to/source/file.txt",
  clean: util.types.toString,
  dataSource: "listFolders",
});
export const toPath = input({
  label: "To Path",
  placeholder: "Enter the destination path",
  type: "string",
  required: true,
  comments:
    "The location of a destination file within a Dropbox share. Include a leading /.",
  example: "/path/to/destination/file.txt",
  clean: util.types.toString,
  dataSource: "listFolders",
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
export const filePaths = input({
  label: "File Path",
  placeholder: "Enter the source file path",
  type: "string",
  collection: "valuelist",
  comments:
    "The paths of the files to act on. Each path must include a leading /. Supply this input, Dynamic Paths, or both.",
  example: "/path/to/source/file.txt",
  required: false,
  clean: cleanPathArray,
});
export const urlToSave = input({
  label: "URL to Save",
  placeholder: "Enter the URL to save",
  type: "string",
  required: true,
  comments: "The URL to save to Dropbox",
  example: "https://example.com/file.txt",
  clean: util.types.toString,
});
export const waitUntilComplete = input({
  label: "Wait Until Complete",
  type: "boolean",
  required: false,
  default: "false",
  comments:
    "When true, polls the save job until it finishes and returns the final job status instead of the initial job ID.",
  clean: util.types.toBool,
});
export const asyncJobId = input({
  label: "Async Job ID",
  placeholder: "Enter the async job ID",
  type: "string",
  required: true,
  comments:
    "The identifier of the asynchronous job to check. The Save From URL action returns this value in its response.",
  example: "nMvNReawvD4AAAAAAAAAAQ",
  clean: util.types.toString,
});
export const recursive = input({
  label: "Recursive",
  comments: "If true, the response will contain contents of all subfolders.",
  type: "boolean",
  default: "false",
  required: true,
  clean: util.types.toBool,
});
export const includeDeleted = input({
  label: "Include Deleted?",
  comments:
    "If true, the results will include entries for files and folders that used to exist but were deleted.",
  type: "boolean",
  default: "false",
  required: true,
  clean: util.types.toBool,
});
export const dynamicPaths = input({
  label: "Dynamic Paths",
  type: "data",
  required: false,
  comments:
    "A list of file paths referenced from a previous step, each with a leading /. Supply this input, File Paths, or both.",
  example: `["/path/to/file", "/path/to/another/file"]`,
  clean: cleanPathArray,
});
export const fileId = input({
  label: "File ID",
  placeholder: "Enter the file ID",
  type: "string",
  required: true,
  comments: "The ID for the shared file.",
  example: "id:3kmLmQFnf1AAAAAAAAAAAw",
  clean: util.types.toString,
});
export const include_media_info = input({
  label: "Include Media Info",
  type: "boolean",
  required: false,
  comments: "If true, FileMetadata.media_info is set for photo and video.",
  clean: util.types.toBool,
  default: "false",
});
export const include_deleted = input({
  label: "Include Deleted",
  type: "boolean",
  required: false,
  comments:
    "When true, metadata is returned for a file or folder that has been deleted, instead of the request failing with a not-found error.",
  clean: util.types.toBool,
  default: "false",
});
export const include_has_explicit_shared_members = input({
  label: "Include Has Explicit Shared Members",
  type: "boolean",
  required: false,
  comments:
    "If true, the results will include a flag for each file indicating whether or not that file has any explicit members.",
  clean: util.types.toBool,
  default: "false",
});
export const resultOptions = structuredObjectInput({
  label: "Result Options",
  required: false,
  comments:
    "Options that control which records are returned and how the response is shaped.",
  inputs: {
    include_media_info,
    include_deleted,
    include_has_explicit_shared_members,
  },
});
export const include_property_groups = input({
  label: "Include Property Groups",
  type: "string",
  required: false,
  comments:
    "If set to a valid list of template IDs, FileMetadata.property_groups is set if there exists property data associated with the file and each of the listed templates.",
  clean: cleanStringWithTag,
  model: [
    { label: "filter_some", value: "filter_some" },
    { label: "Empty", value: "" },
  ],
  default: "",
});
export const download_as_zip = input({
  label: "Download as Zip",
  type: "boolean",
  required: false,
  comments:
    "Download a folder from the user's Dropbox, as a zip file. The folder must be less than 20 GB in size and any single file within must be less than 4 GB in size.",
  clean: util.types.toBool,
  default: "false",
});
export const entryFilter = input({
  label: "Entry Filter",
  type: "string",
  required: true,
  default: BOTH_ENTRY_FILTER,
  comments:
    "Select a filter to return only files or folders. If both are selected, all will be returned.",
  model: [
    { label: "File", value: "file" },
    { label: "Folder", value: "folder" },
    { label: "Files and Folders", value: BOTH_ENTRY_FILTER },
  ],
  clean: util.types.toString,
});
export const copyObjectInputs = {
  dropboxConnection: connectionInput,
  fromPath,
  toPath,
};
export const deleteObjectInputs = {
  dropboxConnection: connectionInput,
  path,
};
export const downloadFileInputs = {
  dropboxConnection: connectionInput,
  path,
  download_as_zip,
};
export const exportFileInputs = {
  dropboxConnection: connectionInput,
  path: {
    ...directoryPath,
    required: true,
    comments: "The path of the file to be exported.",
    example: "/Homework/math/Prime_Numbers.gsheet",
  },
  userType,
  teamMemberId,
};
export const getDownloadStatusInputs = {
  dropboxConnection: connectionInput,
  asyncJobId,
};
export const getFileLockInputs = {
  dropboxConnection: connectionInput,
  teamMemberId: {
    ...teamMemberId,
    comments: "Used to specify the user to act on behalf of.",
  },
  filePaths,
  dynamicPaths,
};
export const getMetadataInputs = {
  dropboxConnection: connectionInput,
  path: {
    ...path,
    comments:
      "The file or folder to get metadata for. Accepts either a path with a leading / or a Dropbox ID.",
    example: "/Homework/math",
    required: true,
  },
  resultOptions,
  userType,
  teamMemberId,
};
export const lockFileInputs = {
  dropboxConnection: connectionInput,
  teamMemberId: {
    ...teamMemberId,
    comments: "Used to specify the user to act on behalf of.",
  },
  filePaths,
  dynamicPaths,
};
export const moveObjectInputs = {
  dropboxConnection: connectionInput,
  fromPath,
  toPath,
};
export const saveFromUrlInputs = {
  dropboxConnection: connectionInput,
  toPath: {
    ...toPath,
    comments:
      "The path with file name with extension where the URL will be saved to in Dropbox.",
    example: "/path/to/file.txt",
  },
  urlToSave,
  waitUntilComplete,
};
export const searchFilesInputs = {
  dropboxConnection: connectionInput,
  query: {
    ...fileName,
    required: true,
    placeholder: "Enter a full or partial file name",
    comments:
      "The term to search for. Matches against file names only, not file contents, so a query of report returns quarterly-report.pdf.",
    example: "report",
  },
  path: directoryPath,
  fetchAll,
  pagination,
  userType,
  teamMemberId,
};
export const unlockFileInputs = {
  dropboxConnection: connectionInput,
  userType,
  teamMemberId,
  filePaths,
  dynamicPaths,
};
export const uploadFileInputs = {
  dropboxConnection: connectionInput,
  path,
  fileContents,
};

import { input } from "@prismatic-io/spectral";
import { FILE_ENCODING_OPTIONS } from "../constants";
import {
  cleanString,
  toFilePathSegment,
  toRequiredString,
  toRequiredVerbatimString,
} from "../utils";
import { connectionInput, project, ref } from "./common";
const commitBranch = input({
  label: "Branch",
  placeholder: "Enter branch name",
  type: "string",
  required: true,
  comments: "The branch to commit the change to.",
  example: "main",
  dataSource: "selectBranch",
  clean: toRequiredString,
});
const filePath = input({
  label: "File Path",
  placeholder: "Enter file path",
  type: "string",
  required: true,
  comments:
    "The path of the file in the repository, such as config/settings.json.",
  example: "config/settings.json",
  clean: toFilePathSegment,
});
const content = input({
  label: "Content",
  placeholder: "Enter file content",
  type: "code",
  language: "plaintext",
  required: true,
  comments: "The file content. Use Base64 encoding for binary files.",
  example: '{ "retryLimit": 3, "backoffMs": 500 }',
  clean: toRequiredVerbatimString,
});
const commitMessage = input({
  label: "Commit Message",
  placeholder: "Enter commit message",
  type: "string",
  required: true,
  comments: "The message for the commit that writes the file.",
  example: "Update retry settings",
  clean: toRequiredString,
});
const encoding = input({
  label: "Encoding",
  type: "string",
  required: false,
  default: "text",
  comments: "How Content is encoded: text, or base64 for binary files.",
  model: FILE_ENCODING_OPTIONS,
  clean: cleanString,
});
export const getFileInputs = {
  connection: connectionInput,
  project,
  filePath,
  ref: {
    ...ref,
    comments: "The branch name, tag, or commit SHA to read the file from.",
  },
};
export const createFileInputs = {
  connection: connectionInput,
  project,
  filePath,
  branch: commitBranch,
  content,
  commitMessage,
  encoding,
};
export const updateFileInputs = createFileInputs;

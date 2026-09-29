import { input, util } from "@prismatic-io/spectral";
import { cleanString } from "../utils";
import { connectionInput, owner, repo } from "./common";
const blobContent = input({
  label: "Content",
  type: "string",
  required: true,
  clean: cleanString,
  comments: "The content of the new blob",
});
const blobEncoding = input({
  label: "Encoding",
  type: "string",
  required: false,
  default: "utf-8",
  clean: cleanString,
  comments: 'The encoding used for "content"',
});
export const gitCreateBlobInputs = {
  connection: connectionInput,
  owner,
  repo,
  content: blobContent,
  encoding: blobEncoding,
};
const gitRef = input({
  label: "Ref",
  type: "string",
  required: true,
  clean: cleanString,
  comments:
    'The name of the fully qualified reference (ie: "refs/heads/master")',
});
const gitSha = input({
  label: "Sha",
  type: "string",
  required: true,
  clean: cleanString,
  comments: "The SHA1 value for this reference",
});
const gitRefKey = input({
  label: "Key",
  type: "string",
  required: false,
  example: '"refs/heads/newbranch"',
  clean: cleanString,
});
export const gitCreateRefInputs = {
  connection: connectionInput,
  owner,
  repo,
  ref: gitRef,
  sha: gitSha,
  key: gitRefKey,
};
const gitRefName = input({
  label: "Ref",
  type: "string",
  required: true,
  clean: cleanString,
  comments: "ref parameter",
});
export const gitGetRefInputs = {
  connection: connectionInput,
  owner,
  repo,
  ref: gitRefName,
};
const gitTree = input({
  label: "Tree",
  type: "code",
  language: "json",
  required: true,
  comments:
    'Objects (of "path", "mode", "type", and "content" or "sha") specifying a tree structure. See https://docs.github.com/en/rest/git/trees#create-a-tree',
  default: JSON.stringify(
    [{ path: "test.txt", mode: "100644", content: "This is a test" }],
    null,
    2,
  ),
  clean: util.types.toObject,
});
const baseTree = input({
  label: "Base Tree",
  type: "string",
  required: false,
  example: "9fb037999f264ba9a7fc6274d15fa3ae2ab98312",
  clean: cleanString,
  comments:
    "The SHA1 of an existing Git tree object which will be used as the base for the new tree",
});
export const gitCreateTreeInputs = {
  connection: connectionInput,
  owner,
  repo,
  tree: gitTree,
  baseTree,
};

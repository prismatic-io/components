import { input } from "@prismatic-io/spectral";
import { cleanString, toOptionalTimestamp, toPathSegment } from "../utils";
import {
  connectionInput,
  fetchAll,
  pagination,
  project,
  refName,
} from "./common";
const commitSha = input({
  label: "Commit SHA",
  placeholder: "Enter commit SHA",
  type: "string",
  required: true,
  comments:
    "The commit SHA, or a branch or tag name to resolve to its latest commit.",
  example: "8d2f5c7a9b1e3f4d6c8a0b2e4f6a8c0d2e4f6a8c",
  clean: toPathSegment,
});
const since = input({
  label: "Since",
  type: "string",
  required: false,
  placeholder: "Enter ISO 8601 date-time",
  comments: "Return only commits after this date-time, in ISO 8601 format.",
  example: "2026-09-01T00:00:00Z",
  clean: toOptionalTimestamp,
});
const until = input({
  label: "Until",
  type: "string",
  required: false,
  placeholder: "Enter ISO 8601 date-time",
  comments: "Return only commits before this date-time, in ISO 8601 format.",
  example: "2026-09-30T00:00:00Z",
  clean: toOptionalTimestamp,
});
const path = input({
  label: "Path",
  type: "string",
  required: false,
  placeholder: "Enter file path",
  comments: "Return only commits that touch this file path.",
  example: "src/settlements/retry.ts",
  clean: cleanString,
});
export const listCommitsInputs = {
  connection: connectionInput,
  project,
  fetchAll,
  pagination,
  refName,
  since,
  until,
  path,
};
export const getCommitInputs = {
  connection: connectionInput,
  project,
  commitSha,
};

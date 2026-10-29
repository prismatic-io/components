import { input } from "@prismatic-io/spectral";
import { toOptionalBoolean, toRequiredString } from "../utils";
import {
  connectionInput,
  fetchAll,
  issueIid,
  mergeRequestIid,
  pagination,
  project,
} from "./common";

const body = input({
  label: "Body",
  placeholder: "Enter comment",
  type: "text",
  required: true,
  comments: "The comment text, in Markdown.",
  example: "Deployed to staging; settlements now retry up to 3 times.",
  clean: toRequiredString,
});

const internal = input({
  label: "Internal",
  type: "boolean",
  required: false,
  comments:
    "When true, the note is internal and visible only to project members with at least the Reporter role.",
  clean: toOptionalBoolean,
});

export const listIssueNotesInputs = {
  connection: connectionInput,
  project,
  issueIid,
  fetchAll,
  pagination,
};

export const createIssueNoteInputs = {
  connection: connectionInput,
  project,
  issueIid,
  body,
  internal,
};

export const listMergeRequestNotesInputs = {
  connection: connectionInput,
  project,
  mergeRequestIid,
  fetchAll,
  pagination,
};

export const createMergeRequestNoteInputs = {
  connection: connectionInput,
  project,
  mergeRequestIid,
  body,
  internal,
};

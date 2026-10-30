import { input, structuredObjectInput, util } from "@prismatic-io/spectral";
import { toOptionalBool, toOptionalString } from "../util";
import {
  connectionInput,
  description,
  dynamicValues,
  fieldValues,
  pagination,
  projectId,
  projectKey,
} from "./common";

const versionName = input({
  label: "Version Name",
  type: "string",
  placeholder: "Enter version name",
  required: true,
  example: "2019.08.18",
  comments: "The display name of the version (e.g., a release tag or date).",
  clean: util.types.toString,
});

const archived = input({
  label: "Archived",
  type: "boolean",
  required: false,
  comments: "When true, marks the version as archived.",
  clean: toOptionalBool,
});

const released = input({
  label: "Released",
  type: "boolean",
  required: false,
  comments: "When true, marks the version as released.",
  clean: toOptionalBool,
});

const startDate = input({
  label: "Start Date",
  type: "string",
  placeholder: "Enter start date (YYYY-MM-DD)",
  required: false,
  example: "2021-07-22",
  comments: "The date when work on this version starts. Format: `YYYY-MM-DD`.",
  clean: toOptionalString,
});

const releaseDate = input({
  label: "Release Date",
  type: "string",
  placeholder: "Enter release date (YYYY-MM-DD)",
  required: false,
  example: "2021-07-22",
  comments: "The date when this version is released. Format: `YYYY-MM-DD`.",
  clean: toOptionalString,
});

const releaseDetails = structuredObjectInput({
  label: "Release Details",
  required: false,
  comments: "Status flags and schedule dates.",
  inputs: { archived, released, startDate, releaseDate },
});

const versionId = input({
  label: "Version ID",
  type: "string",
  placeholder: "Enter version ID",
  required: true,
  example: "10201",
  comments: "The unique identifier of the version.",
  dataSource: "selectVersion",
  clean: util.types.toString,
});

export const createVersionInputs = {
  jiraConnection: connectionInput,
  description: {
    ...description,
    placeholder: "Enter version description",
    comments:
      "A short summary of what the version delivers, shown on the release page.",
  },
  versionName,
  releaseDetails,
  projectKey,
  projectId,
  dynamicValues,
  fieldValues,
};

export const getVersionInputs = {
  jiraConnection: connectionInput,
  versionId,
};

export const listVersionsInputs = {
  jiraConnection: connectionInput,
  projectId,
  pagination,
};

export const updateVersionInputs = {
  jiraConnection: connectionInput,
  versionId,
  description: {
    ...description,
    placeholder: "Enter version description",
    comments:
      "A short summary of what the version delivers, shown on the release page.",
  },
  versionName: { ...versionName, required: false, clean: toOptionalString },
  releaseDetails,
  projectKey,
  projectId,
  dynamicValues,
  fieldValues,
};

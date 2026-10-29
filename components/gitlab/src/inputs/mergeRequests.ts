import { input, structuredObjectInput } from "@prismatic-io/spectral";
import { BOOLEAN_OPTIONS, MERGE_REQUEST_STATE_OPTIONS } from "../constants";
import { cleanString, toOptionalBoolean, toRequiredString } from "../utils";
import {
  assigneeIds,
  connectionInput,
  createDescription,
  description,
  fetchAll,
  labels,
  mergeRequestIid,
  optionalTitle,
  pagination,
  project,
  search,
  stateEvent,
  title,
  updatedAfter,
} from "./common";

const mergeRequestState = input({
  label: "State",
  type: "string",
  required: false,
  comments:
    "Return only merge requests in this state. Leave empty for all states.",
  model: MERGE_REQUEST_STATE_OPTIONS,
  clean: cleanString,
});

const sourceBranch = input({
  label: "Source Branch",
  placeholder: "Enter source branch",
  type: "string",
  required: true,
  comments: "The branch containing the changes.",
  example: "feature/ach-retry",
  dataSource: "selectBranch",
  clean: toRequiredString,
});

const targetBranch = input({
  label: "Target Branch",
  placeholder: "Enter target branch",
  type: "string",
  required: true,
  comments: "The branch the changes merge into.",
  example: "main",
  dataSource: "selectBranch",
  clean: toRequiredString,
});

const filterSourceBranch = {
  ...sourceBranch,
  required: false,
  comments: "Return only merge requests from this source branch.",
  clean: cleanString,
};

const filterTargetBranch = {
  ...targetBranch,
  required: false,
  comments: "Return only merge requests into this target branch.",
  clean: cleanString,
};

const removeSourceBranch = input({
  label: "Remove Source Branch",
  type: "string",
  required: false,
  comments:
    "When True, delete the source branch after the merge request merges. Leave unselected to use GitLab's default.",
  model: BOOLEAN_OPTIONS,
  clean: toOptionalBoolean,
});

const squash = input({
  label: "Squash",
  type: "string",
  required: false,
  comments:
    "When True, squash the commits into one when merging. Leave unselected to use the project's squash setting.",
  model: BOOLEAN_OPTIONS,
  clean: toOptionalBoolean,
});

const mergeCommitMessage = input({
  label: "Merge Commit Message",
  placeholder: "Enter merge commit message",
  type: "text",
  required: false,
  comments: "A custom merge commit message. Leave empty for GitLab's default.",
  example: "Merge branch 'feature/ach-retry' into 'main'",
  clean: cleanString,
});

const sha = input({
  label: "SHA",
  placeholder: "Enter expected head SHA",
  type: "string",
  required: false,
  comments:
    "When set, the merge succeeds only if the source branch's head is this commit, preventing a merge of unreviewed changes.",
  example: "8d2f5c7a9b1e3f4d6c8a0b2e4f6a8c0d2e4f6a8c",
  clean: cleanString,
});

export const listMergeRequestsInputs = {
  connection: connectionInput,
  project,
  fetchAll,
  pagination,
  mergeRequestState,
  sourceBranch: filterSourceBranch,
  targetBranch: filterTargetBranch,
  labels: {
    ...labels,
    comments: "Return only merge requests that have all of these labels.",
  },
  search,
  updatedAfter,
};

export const getMergeRequestInputs = {
  connection: connectionInput,
  project,
  mergeRequestIid,
};

const createMergeRequestAdditionalFields = structuredObjectInput({
  label: "Additional Fields",
  required: false,
  comments:
    "Additional optional fields: includes Description, Remove Source Branch, and Squash.",
  inputs: { description: createDescription, removeSourceBranch, squash },
});

const updateMergeRequestAdditionalFields = structuredObjectInput({
  label: "Additional Fields",
  required: false,
  comments:
    "Additional optional fields: includes Title, Description, and State Event.",
  inputs: { title: optionalTitle, description, stateEvent },
});

const mergeOptions = structuredObjectInput({
  label: "Merge Options",
  required: false,
  comments:
    "Merge commit message, squash, source branch removal, and expected head SHA.",
  inputs: {
    mergeCommitMessage,
    squash,
    shouldRemoveSourceBranch: removeSourceBranch,
    sha,
  },
});

export const createMergeRequestInputs = {
  connection: connectionInput,
  project,
  sourceBranch,
  targetBranch,
  title,
  labels: { ...labels, comments: "Label names to apply." },
  assigneeIds: {
    ...assigneeIds,
    comments: "The numeric IDs of the users to assign.",
  },
  additionalFields: createMergeRequestAdditionalFields,
};

export const updateMergeRequestInputs = {
  connection: connectionInput,
  project,
  mergeRequestIid,
  labels,
  assigneeIds,
  targetBranch: {
    ...filterTargetBranch,
    comments: "The new target branch. Leave empty to keep the current target.",
  },
  additionalFields: updateMergeRequestAdditionalFields,
};

export const acceptMergeRequestInputs = {
  connection: connectionInput,
  project,
  mergeRequestIid,
  mergeOptions,
};

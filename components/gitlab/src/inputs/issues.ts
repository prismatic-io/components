import { input, structuredObjectInput } from "@prismatic-io/spectral";
import { BOOLEAN_OPTIONS, ISSUE_STATE_OPTIONS } from "../constants";
import {
  cleanString,
  toOptionalBoolean,
  toOptionalDate,
  toOptionalId,
} from "../utils";
import {
  assigneeIds,
  connectionInput,
  createDescription,
  description,
  fetchAll,
  issueIid,
  labels,
  optionalTitle,
  pagination,
  project,
  search,
  stateEvent,
  title,
  updatedAfter,
} from "./common";

const milestoneId = input({
  label: "Milestone ID",
  placeholder: "Enter milestone ID",
  type: "string",
  required: false,
  comments: "The numeric global ID of the milestone.",
  example: "55120",
  dataSource: "selectMilestone",
  clean: toOptionalId,
});

const issueState = input({
  label: "State",
  type: "string",
  required: false,
  comments: "Return only issues in this state. Leave empty for all states.",
  model: ISSUE_STATE_OPTIONS,
  clean: cleanString,
});

const dueDate = input({
  label: "Due Date",
  type: "string",
  required: false,
  placeholder: "Enter due date (YYYY-MM-DD)",
  comments: "The due date, in YYYY-MM-DD format.",
  example: "2026-10-15",
  clean: toOptionalDate,
});

const confidential = input({
  label: "Confidential",
  type: "string",
  required: false,
  comments:
    "When True, the issue is confidential. Leave unselected to use GitLab's default on create or keep the current value on update.",
  model: BOOLEAN_OPTIONS,
  clean: toOptionalBoolean,
});

const filterLabels = {
  ...labels,
  comments: "Return only issues that have all of these labels.",
};

export const listIssuesInputs = {
  connection: connectionInput,
  project,
  fetchAll: {
    ...fetchAll,
    comments:
      "When true, automatically fetches all pages of results using pagination. The API returns up to 100 results per page. GitLab caps offset pagination on this endpoint at 50,000 records by default, so Fetch All cannot retrieve results beyond that.",
  },
  pagination,
  issueState,
  labels: filterLabels,
  search,
  updatedAfter,
};

export const getIssueInputs = {
  connection: connectionInput,
  project,
  issueIid,
};

const createIssueAdditionalFields = structuredObjectInput({
  label: "Additional Fields",
  required: false,
  comments:
    "Additional optional fields: includes Description, Due Date, and Confidential.",
  inputs: { description: createDescription, dueDate, confidential },
});

const updateIssueAdditionalFields = structuredObjectInput({
  label: "Additional Fields",
  required: false,
  comments:
    "Additional optional fields: includes Title, Description, Due Date, State Event, and Confidential.",
  inputs: {
    title: optionalTitle,
    description,
    dueDate,
    stateEvent,
    confidential,
  },
});

export const createIssueInputs = {
  connection: connectionInput,
  project,
  title,
  labels: { ...labels, comments: "Label names to apply." },
  assigneeIds: {
    ...assigneeIds,
    comments: "The numeric IDs of the users to assign.",
  },
  milestoneId,
  additionalFields: createIssueAdditionalFields,
};

export const updateIssueInputs = {
  connection: connectionInput,
  project,
  issueIid,
  labels,
  assigneeIds,
  milestoneId,
  additionalFields: updateIssueAdditionalFields,
};

export const deleteIssueInputs = {
  connection: connectionInput,
  project,
  issueIid,
};

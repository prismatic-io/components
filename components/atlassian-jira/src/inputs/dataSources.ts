import { input, util } from "@prismatic-io/spectral";
import { projectIdsClean } from "../util";
import {
  boardId,
  connectionInput,
  filter,
  maxResults,
  projectId,
  startAt,
} from "./common";

const projectIds = input({
  label: "Project ID(s)",
  type: "string",
  placeholder: "Enter project ID(s)",
  required: true,
  example: "10201",
  comments:
    "One or more Jira project IDs whose issue types populate the dropdown. Accepts a single ID or a selection of projects.",
  clean: projectIdsClean,
});

const returnIssueTypeName = input({
  label: "Issue Type Return",
  type: "string",
  placeholder: "Enter true or false",
  required: true,
  default: "false",
  comments:
    "When true, returns the Issue Type Name; when false, returns the Issue Type ID. Defaults to ID.",
  example: "false",
  clean: util.types.toBool,
});

const onlyCustomFields = input({
  label: "Only Custom Fields",
  type: "boolean",
  required: false,
  default: "false",
  comments:
    "When true, returns only custom fields; when false, returns all issue fields.",
  clean: util.types.toBool,
});

export const selectBoardInputs = {
  jiraConnection: connectionInput,
  startAt,
  maxResults,
  filter,
};

export const selectBoardVersionInputs = {
  jiraConnection: connectionInput,
  boardId: {
    ...boardId,
    dataSource: undefined,
  },
  startAt,
  maxResults,
};

export const selectIssueTypeInputs = {
  connection: connectionInput,
  projectIds,
  returnIssueTypeName,
};

export const selectIssueTypesInputs = {
  connection: connectionInput,
  projectIds,
};

export const issueFieldsInputs = {
  connection: connectionInput,
  onlyCustomFields,
};

export const selectIssueInputs = {
  jiraConnection: connectionInput,
  projectId: {
    ...projectId,
    dataSource: undefined,
  },
};

export const selectIssueTypeFromProjectInputs = {
  connection: connectionInput,
  projectId: { ...projectId, dataSource: undefined },
  returnIssueTypeName,
};

export const selectPriorityInputs = {
  jiraConnection: connectionInput,
};

export const selectProjectInputs = {
  connection: connectionInput,
};

export const selectProjectsInputs = {
  connection: connectionInput,
};

export const selectVersionInputs = {
  jiraConnection: connectionInput,
  projectId: {
    ...projectId,
    dataSource: undefined,
  },
};

export const selectWebhookInputs = {
  jiraConnection: connectionInput,
};

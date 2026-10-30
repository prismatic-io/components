import { input, structuredObjectInput, util } from "@prismatic-io/spectral";
import {
  cleanAttachmentArray,
  labelsClean,
  toAllowedValue,
  toOptionalObject,
  toOptionalString,
  toVersionRefs,
} from "../util";
import {
  connectionInput,
  description,
  dynamicValues,
  fieldValues,
  cursorPagination,
  issueId,
  projectId,
  projectKey,
  searchString,
  searchValue,
} from "./common";

const summary = input({
  label: "Summary",
  type: "string",
  placeholder: "Enter issue summary",
  required: true,
  example: "Fix login page responsiveness",
  comments:
    "A short one-line title for the issue, shown in lists and search results.",
  clean: util.types.toString,
});

const assignee = input({
  label: "Assignee Account ID",
  type: "string",
  placeholder: "Enter assignee account ID",
  required: false,
  example: "5b10a2844c20165700ede21g",
  comments: "The Atlassian account ID of the user to assign the issue to.",
  clean: toOptionalString,
});

const reporter = input({
  label: "Reporter Account ID",
  type: "string",
  placeholder: "Enter reporter account ID",
  required: false,
  example: "5b10a2844c20165700ede21g",
  comments: "The Atlassian account ID of the user reporting the issue.",
  clean: toOptionalString,
});

const issueType = input({
  label: "Issue Type Name",
  type: "string",
  required: false,
  model: [
    { label: "Bug", value: "Bug" },
    { label: "Task", value: "Task" },
    { label: "Story", value: "Story" },
    { label: "Epic", value: "Epic" },
  ],
  example: "Task",
  comments:
    "The human-readable name of the issue type to assign to the issue. Provide this field OR Issue Type ID — not both.",
  clean: util.types.toString,
});

const issueTypeId = input({
  label: "Issue Type ID",
  type: "string",
  placeholder: "Enter issue type ID",
  example: "10001",
  required: false,
  comments:
    "The unique identifier of the issue type to assign to the issue. Provide this field OR Issue Type Name — not both.",
  dataSource: "selectIssueTypeFromProject",
  clean: util.types.toString,
});

const ADFdescription = input({
  label: "ADF Description",
  type: "code",
  language: "json",
  placeholder: "Enter ADF document JSON",
  required: false,
  example: JSON.stringify(
    {
      version: 1,
      type: "doc",
      content: [
        {
          type: "paragraph",
          content: [
            {
              type: "text",
              text: "Some text",
            },
          ],
        },
      ],
    },
    null,
    2,
  ),
  comments:
    "The Atlassian Document Format (ADF) JSON representation of the issue description. Provide this OR Description — not both. Use the [ADF playground](https://developer.atlassian.com/cloud/jira/platform/apis/document/playground/) to generate the JSON.",
  clean: toOptionalObject,
});

const fixVersions = input({
  label: "Fix Versions",
  type: "code",
  placeholder: "Enter fix version JSON",
  required: false,
  example: JSON.stringify({ id: "10001" }, null, 2),
  language: "json",
  comments:
    "The fix version(s) for the issue as a JSON object containing an `id` property referencing an existing version.",
  clean: toVersionRefs,
});

const priority = input({
  label: "Priority",
  type: "string",
  placeholder: "Enter priority ID",
  required: false,
  example: "3",
  dataSource: "selectPriority",
  comments:
    "The ID of the priority to assign to the issue. Choose from the dropdown or enter a priority ID.",
  clean: toOptionalString,
});

const labels = input({
  label: "Labels",
  type: "string",
  placeholder: "Enter labels",
  required: false,
  example: "performance",
  collection: "valuelist",
  comments:
    "A list of labels to attach to the issue. Each label must not contain spaces.",
  clean: labelsClean,
});

const dueDate = input({
  label: "Due Date",
  type: "string",
  placeholder: "Enter due date (YYYY-MM-DD)",
  required: false,
  example: "2019-05-11",
  comments: "The date when the issue is due. Format: `YYYY-MM-DD`.",
  clean: toOptionalString,
});

const versions = input({
  label: "Versions",
  type: "code",
  placeholder: "Enter affected versions JSON",
  required: false,
  example: JSON.stringify([{ id: "10000" }], null, 2),
  language: "json",
  comments:
    "The affected version(s) for the issue as a JSON array of objects. Each object must contain an `id` referencing an existing version.",
  clean: toVersionRefs,
});

const additionalFields = structuredObjectInput({
  label: "Additional Fields",
  required: false,
  comments:
    "Additional optional fields: includes Due Date, Versions, and Fix Versions.",
  inputs: { dueDate, versions, fixVersions },
});

const transitionId = input({
  label: "Transition ID",
  type: "string",
  placeholder: "Enter transition ID",
  required: true,
  example: "21",
  comments: "The unique identifier of the issue transition.",
  clean: util.types.toString,
});

const attachmentIds = input({
  label: "Attachment IDs",
  type: "code",
  language: "json",
  placeholder: "Enter attachments JSON",
  required: false,
  comments:
    "A JSON array of attachments to download, each with an `id` and `mimeType`. When provided, the Issue ID input is ignored.",
  example: JSON.stringify(
    [
      { id: "10201", mimeType: "image/png" },
      { id: "10201", mimeType: "image/pdf" },
    ],
    null,
    2,
  ),
  clean: cleanAttachmentArray,
});

const fields = input({
  label: "Fields",
  type: "string",
  placeholder: "Enter fields to return",
  required: false,
  example: "summary,status,assignee,priority",
  comments:
    "A comma-separated list of fields to include in each returned issue. Defaults to common navigable fields (summary, status, assignee, reporter, priority, issuetype, project, created, updated). Use `*all` to return every field.",
  clean: util.types.toString,
});

const searchType = input({
  label: "Search Type",
  type: "string",
  required: true,
  model: [
    { label: "Number", value: "number" },
    { label: "Summary", value: "summary" },
  ],
  comments:
    "The field to match against: Number (issue key or ID) or Summary (text match).",
  clean: (rawValue) =>
    toAllowedValue(rawValue, ["number", "summary"], "Search Type"),
});

const file = input({
  label: "File",
  type: "data",
  required: true,
  comments: "The file to upload - either string contents or a binary file",
  clean: util.types.toBufferDataPayload,
});

const fileName = input({
  label: "File Name",
  type: "string",
  placeholder: "Enter file name",
  required: true,
  example: "report.pdf",
  comments:
    "The file name, including extension, shown on the attachment in Jira.",
  clean: util.types.toString,
});

export const addIssueAttachmentInputs = {
  jiraConnection: connectionInput,
  issueId,
  file,
  fileName,
};

export const createIssueInputs = {
  jiraConnection: connectionInput,
  projectId,
  summary,
  description,
  ADFdescription,
  issueType: {
    ...issueType,
    comments:
      "The name of the issue type. Provide this OR Issue Type ID; one is required, not both.",
  },
  issueTypeId: {
    ...issueTypeId,
    comments:
      "The ID of the issue type. Provide this OR Issue Type Name; one is required, not both.",
  },
  assignee,
  reporter,
  priority,
  labels,
  additionalFields,
  dynamicValues,
  fieldValues,
};

export const deleteIssueInputs = { jiraConnection: connectionInput, issueId };

export const downloadAttachmentInputs = {
  jiraConnection: connectionInput,
  issueId: {
    ...issueId,
    comments: "Providing an Issue ID will return all attachments of an Issue.",
    required: false,
    clean: toOptionalString,
  },
  attachmentIds,
};

export const findIssueInputs = {
  jiraConnection: connectionInput,
  searchType,
  searchValue,
  fields,
};

export const getIssueInputs = {
  jiraConnection: connectionInput,
  issueId,
};

export const listIssueAttachmentsInputs = {
  issueId,
  jiraConnection: connectionInput,
};

export const listIssueTransitionsInputs = {
  jiraConnection: connectionInput,
  issueId,
};

export const listIssueWorklogsInputs = {
  jiraConnection: connectionInput,
  issueId,
};

export const listIssuesInputs = {
  jiraConnection: connectionInput,
  projectId,
  pagination: cursorPagination,
  fields,
};

export const searchIssuesInputs = {
  jiraConnection: connectionInput,
  searchString,
  projectKey,
  fields,
};

export const transitionIssueInputs = {
  jiraConnection: connectionInput,
  issueId,
  transitionId,
};

export const updateIssueInputs = {
  jiraConnection: connectionInput,
  issueId,
  projectId,
  summary: { ...summary, required: false, clean: toOptionalString },
  description,
  ADFdescription,
  issueType,
  issueTypeId,
  assignee: { ...assignee, required: false },
  reporter: { ...reporter, required: false },
  priority,
  labels,
  additionalFields,
  dynamicValues,
  fieldValues,
};

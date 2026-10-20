import { input, structuredObjectInput, util } from "@prismatic-io/spectral";
import { STATE_EVENT_OPTIONS } from "../constants";
import {
  cleanString,
  toIid,
  toOptionalIdList,
  toOptionalLabelList,
  toOptionalTimestamp,
  toPathOrId,
  toPathOrIdList,
  toRequiredString,
} from "../utils";
export const connectionInput = input({
  label: "Connection",
  type: "connection",
  required: true,
  comments: "The GitLab connection to use.",
});
export const project = input({
  label: "Project",
  placeholder: "Enter project ID or path",
  type: "string",
  required: true,
  comments:
    "The numeric ID or full path (group/subgroup/project) of the project, or a project URL from a GitLab instance at the domain root.",
  example: "acme/payments-service",
  dataSource: "selectProject",
  clean: toPathOrId,
});
export const fetchAll = input({
  label: "Fetch All",
  type: "boolean",
  required: false,
  default: "false",
  comments:
    "When true, automatically fetches all pages of results using pagination. The API returns up to 100 results per page.",
  clean: util.types.toBool,
});
export const perPage = input({
  label: "Per Page",
  type: "string",
  required: false,
  comments: "The maximum number of results to return per page. Maximum: 100.",
  example: "50",
  placeholder: "Enter results per page",
  clean: util.types.toNumber,
});
export const page = input({
  label: "Page",
  type: "string",
  required: false,
  placeholder: "Enter page number",
  comments:
    "The page number of results to return, starting at 1. Ignored when Fetch All is true.",
  example: "2",
  clean: util.types.toNumber,
});
export const pagination = structuredObjectInput({
  label: "Pagination",
  required: false,
  comments: "Page and page-size controls.",
  inputs: { perPage, page },
});
export const search = input({
  label: "Search",
  type: "string",
  required: false,
  placeholder: "Enter search text",
  comments: "Return only results that match this text.",
  example: "payments",
  clean: cleanString,
});
export const updatedAfter = input({
  label: "Updated After",
  type: "string",
  required: false,
  placeholder: "Enter ISO 8601 date-time",
  comments:
    "Return only results updated on or after this date-time, in ISO 8601 format.",
  example: "2026-09-01T00:00:00Z",
  clean: toOptionalTimestamp,
});
export const issueIid = input({
  label: "Issue IID",
  placeholder: "Enter issue IID",
  type: "string",
  required: true,
  comments:
    "The project-level number of the issue, shown in GitLab as #42. This is the IID, not the global issue ID.",
  example: "42",
  clean: toIid,
});
export const mergeRequestIid = input({
  label: "Merge Request IID",
  placeholder: "Enter merge request IID",
  type: "string",
  required: true,
  comments:
    "The project-level number of the merge request, shown in GitLab as !17. This is the IID, not the global merge request ID.",
  example: "17",
  clean: toIid,
});
export const title = input({
  label: "Title",
  placeholder: "Enter title",
  type: "string",
  required: true,
  comments:
    "The title of the issue or merge request, shown in lists and notifications.",
  example: "Retry failed ACH settlements",
  clean: toRequiredString,
});
export const optionalTitle = input({
  label: "Title",
  placeholder: "Enter title",
  type: "string",
  required: false,
  comments: "The new title. Leave empty to keep the current title.",
  example: "Retry failed ACH settlements",
  clean: cleanString,
});
export const description = input({
  label: "Description",
  placeholder: "Enter description",
  type: "text",
  required: false,
  comments: "The description, in Markdown. Leave empty to keep it unchanged.",
  example: "Settlements that fail with a transient error are never retried.",
  clean: cleanString,
});
export const createDescription = {
  ...description,
  comments: "The description, in Markdown.",
};
export const labels = input({
  label: "Labels",
  placeholder: "Enter label name",
  type: "string",
  collection: "valuelist",
  required: false,
  comments:
    "Label names to apply. Leave empty to keep the current labels unchanged.",
  example: "bug",
  dataSource: "selectLabel",
  clean: toOptionalLabelList,
});
export const assigneeIds = input({
  label: "Assignee IDs",
  placeholder: "Enter user ID",
  type: "string",
  collection: "valuelist",
  required: false,
  comments:
    "The numeric IDs of the users to assign. Leave empty to keep the current assignees unchanged.",
  example: "1001",
  dataSource: "selectUser",
  clean: toOptionalIdList,
});
export const stateEvent = input({
  label: "State Event",
  type: "string",
  required: false,
  comments: "Close or reopen. Leave empty to keep the current state.",
  model: STATE_EVENT_OPTIONS,
  clean: cleanString,
});
export const ref = input({
  label: "Ref",
  placeholder: "Enter branch, tag, or commit SHA",
  type: "string",
  required: true,
  comments: "A branch name, tag, or commit SHA.",
  example: "main",
  dataSource: "selectBranch",
  clean: toRequiredString,
});
export const refName = input({
  label: "Ref Name",
  placeholder: "Enter branch or tag",
  type: "string",
  required: false,
  comments:
    "Return only results for this branch or tag. Defaults to the default branch where applicable.",
  example: "main",
  clean: cleanString,
});
export const projects = input({
  label: "Projects",
  placeholder: "Enter project ID or path",
  type: "string",
  collection: "valuelist",
  required: true,
  comments:
    "The projects to receive events from, each as a numeric ID or full path, or a project URL from a GitLab instance at the domain root. A webhook is created in each project; managing webhooks requires the Maintainer or Owner role.",
  example: "acme/payments-service",
  dataSource: "selectProject",
  clean: toPathOrIdList,
});

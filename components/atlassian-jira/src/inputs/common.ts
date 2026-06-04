import { input, type KeyValuePair, util } from "@prismatic-io/spectral";
import { JIRA_ISSUE_EVENTS } from "../constants";
import {
  cleanAttachmentArray,
  fieldValuesClean,
  labelsClean,
  projectIdsClean,
  toOptionalObject,
  toOptionalString,
} from "../util";

export const projectIds = input({
  label: "Project ID(s)",
  type: "string",
  placeholder: "Enter project ID(s)",
  required: true,
  example: "10201",
  comments: "One or more Jira Project IDs.",
  clean: projectIdsClean,
});

export const returnIssueTypeName = input({
  label: "Issue Type Return",
  type: "string",
  required: true,
  default: "false",
  comments:
    "When true, returns the Issue Type Name; when false, returns the Issue Type ID. Defaults to ID.",
  example: "false",
  clean: util.types.toBool,
});

export const projectId = input({
  label: "Project ID",
  type: "string",
  placeholder: "Enter project ID",
  required: true,
  example: "10201",
  comments: "The unique identifier or name of the Jira project.",
  dataSource: "selectProject",
  clean: util.types.toString,
});

export const issueId = input({
  label: "Issue ID",
  type: "string",
  placeholder: "Enter issue ID",
  required: true,
  example: "10201",
  comments: "The unique identifier of the Jira issue.",
  dataSource: "selectIssue",
  clean: util.types.toString,
});

export const accountId = input({
  label: "Account ID",
  type: "string",
  placeholder: "Enter account ID",
  required: true,
  example: "5b10a2844c20165700ede21g",
  comments: "The unique Atlassian account ID of the user.",
  clean: util.types.toString,
});

export const expand = input({
  label: "Expand",
  type: "string",
  placeholder: "Enter fields to expand",
  required: false,
  example: "body, version, history",
  comments:
    "A comma-separated list of additional fields to include in the response. Values come from the `_expandable` property of the resource.",
  clean: toOptionalString,
});

export const issueNumber = input({
  label: "Issue Number",
  type: "string",
  placeholder: "Enter an issue number",
  required: true,
  example: "201",
  comments: "The numeric portion of an issue key (e.g., `201` for issue `PROJ-201`).",
  clean: util.types.toString,
});

export const comment = input({
  label: "Comment",
  type: "string",
  placeholder: "Enter comment text",
  required: true,
  example: "This is an example comment.",
  comments: "The plain-text body of the comment.",
  clean: util.types.toString,
});

export const commentId = input({
  label: "Comment ID",
  type: "string",
  placeholder: "Enter comment ID",
  required: true,
  example: "10201",
  comments: "The unique identifier of the comment.",
  clean: util.types.toString,
});

export const summary = input({
  label: "Summary",
  type: "string",
  placeholder: "Enter issue summary",
  required: true,
  example: "Fix login page responsiveness",
  comments: "A short one-line title for the issue, shown in lists and search results.",
  clean: util.types.toString,
});

export const assignee = input({
  label: "Assignee Account ID",
  type: "string",
  placeholder: "Enter assignee account ID",
  required: false,
  example: "5b10a2844c20165700ede21g",
  comments: "The Atlassian account ID of the user to assign the issue to.",
  clean: toOptionalString,
});

export const reporter = input({
  label: "Reporter Account ID",
  type: "string",
  placeholder: "Enter reporter account ID",
  required: false,
  example: "5b10a2844c20165700ede21g",
  comments: "The Atlassian account ID of the user reporting the issue.",
  clean: toOptionalString,
});

export const filter = input({
  label: "Filter",
  type: "string",
  placeholder: "Enter filter (e.g. my, favourite)",
  required: true,
  comments:
    "The scope used to limit returned dashboards. Common values are `my` (dashboards owned by the current user) and `favourite` (dashboards starred by the current user).",
  example: "my",
  default: "my",
  clean: util.types.toString,
});

export const issueType = input({
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

export const issueTypeId = input({
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

export const description = input({
  label: "Description",
  type: "string",
  placeholder: "Enter issue description",
  required: false,
  example: "The login button does not respond on mobile devices in portrait mode.",
  comments: "A detailed description of the issue.",
  clean: toOptionalString,
});

export const ADFdescription = input({
  label: "ADF Description",
  type: "code",
  language: "json",
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

export const connectionInput = input({
  label: "Connection",
  type: "connection",
  required: true,
  comments: "The Jira connection to use.",
});

export const emailAddress = input({
  label: "Email Address",
  type: "string",
  placeholder: "Enter email address",
  required: false,
  example: "someone@example.com",
  comments: "The email address of the user.",
  clean: util.types.toString,
});

export const username = input({
  label: "Username",
  type: "string",
  placeholder: "Enter username",
  required: true,
  example: "john.doe",
  comments: "The username for the Jira user account.",
  clean: util.types.toString,
});

export const password = input({
  label: "Password",
  type: "password",
  placeholder: "Enter password",
  required: true,
  comments: "The password to assign to the new user account.",
  clean: util.types.toString,
});

export const notifications = input({
  label: "Notifications",
  type: "boolean",
  required: true,
  comments: "When true, the user will receive email notifications for relevant events.",
  clean: util.types.toBool,
});

export const displayName = input({
  label: "Display Name",
  type: "string",
  placeholder: "Enter display name",
  required: false,
  example: "John Doe",
  comments: "The display name for the user account.",
  clean: util.types.toString,
});

export const searchString = input({
  label: "Search",
  type: "string",
  placeholder: "Enter search query",
  required: true,
  example: "login bug",
  comments: "The text to match against records when searching.",
  clean: util.types.toString,
});

export const maxResults = input({
  label: "Max Results",
  type: "string",
  placeholder: "Enter max results",
  required: false,
  example: "50",
  comments: "The maximum number of results to return per page.",
  clean: (rawValue) => util.types.toInt(rawValue, 50),
});

export const startAt = input({
  label: "Start At",
  type: "string",
  placeholder: "Enter starting index",
  required: false,
  example: "0",
  default: "0",
  comments: "The index of the first item to return in the result set (0-based).",
  clean: (rawValue) => util.types.toInt(rawValue, 0),
});

export const boardId = input({
  label: "Board ID",
  type: "string",
  placeholder: "Enter board ID",
  required: true,
  example: "10201",
  comments: "The unique identifier of the Jira board.",
  dataSource: "selectBoard",
  clean: util.types.toString,
});

export const fixVersions = input({
  label: "Fix Versions",
  type: "code",
  required: false,
  example: `{
  id: "10001",
}`,
  language: "json",
  comments:
    "The fix version(s) for the issue as a JSON object containing an `id` property referencing an existing version.",
});

export const priority = input({
  label: "Priority",
  type: "string",
  placeholder: "Select priority",
  required: false,
  example: "High",
  dataSource: "selectPriority",
  comments:
    "The priority to assign to the issue. Accepts the priority ID, key, or name of the desired record.",
  clean: toOptionalString,
});

export const labels = input({
  label: "Labels",
  type: "string",
  placeholder: "Enter labels",
  required: false,
  example: "performance",
  collection: "valuelist",
  comments: "A list of labels to attach to the issue. Each label must not contain spaces.",
  clean: labelsClean,
});

export const dueDate = input({
  label: "Due Date",
  type: "string",
  placeholder: "YYYY-MM-DD",
  required: false,
  example: "2019-05-11",
  comments: "The date when the issue is due. Format: `YYYY-MM-DD`.",
  clean: toOptionalString,
});

export const versions = input({
  label: "Versions",
  type: "code",
  required: false,
  example: `[
  {
    "id": "10000"
  }
]`,
  language: "json",
  comments:
    "The affected version(s) for the issue as a JSON array of objects. Each object must contain an `id` referencing an existing version.",
});

export const file = input({
  label: "File",
  type: "string",
  placeholder: "Enter file data",
  required: false,
  comments: "The binary contents of the file to upload as an attachment.",
});

export const versionName = input({
  label: "Version Name",
  type: "string",
  placeholder: "Enter version name",
  required: true,
  example: "2019.08.18",
  comments: "The display name of the version (e.g., a release tag or date).",
  clean: util.types.toString,
});

export const archived = input({
  label: "Archived",
  type: "boolean",
  required: false,
  comments: "When true, marks the version as archived.",
  clean: util.types.toBool,
});

export const released = input({
  label: "Released",
  type: "boolean",
  required: false,
  comments: "When true, marks the version as released.",
  clean: util.types.toBool,
});

export const startDate = input({
  label: "Start Date",
  type: "string",
  placeholder: "YYYY-MM-DD",
  required: false,
  example: "2021-07-22",
  comments: "The date when work on this version starts. Format: `YYYY-MM-DD`.",
  clean: toOptionalString,
});

export const releaseDate = input({
  label: "Release Date",
  type: "string",
  placeholder: "YYYY-MM-DD",
  required: false,
  example: "2021-07-22",
  comments: "The date when this version is released. Format: `YYYY-MM-DD`.",
  clean: toOptionalString,
});

export const projectKey = input({
  label: "Project Key",
  type: "string",
  placeholder: "Enter project key",
  required: false,
  example: "PROJ",
  comments: "The project key identifier (e.g., PROJ, ENG, SALES).",
  clean: util.types.toString,
});

export const transitionId = input({
  label: "Transition ID",
  type: "string",
  placeholder: "Enter transition ID",
  required: true,
  example: "21",
  comments: "The unique identifier of the issue transition.",
  clean: util.types.toString,
});

export const versionId = input({
  label: "Version ID",
  type: "string",
  placeholder: "Enter version ID",
  required: true,
  example: "10201",
  comments: "The unique identifier of the version.",
  dataSource: "selectVersion",
  clean: util.types.toString,
});

export const startAtInput = input({
  label: "Start At",
  type: "string",
  placeholder: "Enter starting index",
  required: false,
  default: "0",
  example: "17",
  comments: "Index of first record to start a page of results at.",
  clean: util.types.toNumber,
});

export const maxResultsInput = input({
  label: "Max Results",
  type: "string",
  placeholder: "Enter max results",
  required: false,
  default: "100",
  example: "100",
  comments: "Specify the page size limit for pagination.",
  clean: util.types.toNumber,
});

export const fieldValues = input({
  label: "Values",
  type: "string",
  placeholder: "Enter field values",
  collection: "keyvaluelist",
  required: false,
  example: "projectId=1000,name=Example",
  comments:
    "Additional field names and their values to include when creating or updating the record. Each row is merged into the request payload.",
  clean: (value) => util.types.keyValPairListToObject(value as KeyValuePair[]),
});

export const dynamicValues = input({
  label: "Dynamic Fields",
  type: "code",
  language: "json",
  required: false,
  example: JSON.stringify(
    [
      {
        key: "name",
        value: "Example Name",
      },
      {
        key: "projectId",
        value: "Example projectId",
      },
    ],
    null,
    2,
  ),
  comments:
    "Dynamic field key/value pairs supplied as JSON. Use a key/value config variable to configure these at deploy time. Each item must contain a `key` and a `value`.",
  clean: fieldValuesClean,
});

export const webhookDetails = input({
  label: "Webhook Details",
  type: "code",
  language: "json",
  required: false,
  comments:
    "The webhook details payload sent to Jira's OAuth2 Webhook API or REST API. Must match the structure of the `webhooks` property described in the [Register Dynamic Webhook endpoint](https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-webhooks/#api-rest-api-3-webhook-post).",
  clean: util.types.toObject,
  example: JSON.stringify(
    [
      {
        events: ["jira:issue_created", "jira:issue_updated"],
        fieldIdsFilter: ["summary", "customfield_10029"],
        jqlFilter: "project = PROJ",
      },
      {
        events: ["jira:issue_deleted"],
        jqlFilter: "project IN (PROJ, EXP) AND status = done",
      },
      {
        events: ["issue_property_set"],
        issuePropertyKeysFilter: ["my-issue-property-key"],
        jqlFilter: "project = PROJ",
      },
    ],
    null,
    2,
  ),
});

export const webhookUrl = input({
  label: "Webhook URL",
  type: "string",
  placeholder: "Enter webhook URL",
  required: true,
  example: "https://hooks.example.com/trigger/abc123",
  comments:
    "The URL that Jira will POST webhook events to. Typically reference a flow's URL from the trigger payload.",
  clean: util.types.toString,
});

export const webhookIdInput = input({
  label: "Webhook ID",
  type: "string",
  placeholder: "Enter webhook ID",
  required: true,
  example: "10001",
  comments: "The unique identifier of the webhook.",
  dataSource: "selectWebhook",
  clean: util.types.toString,
});

export const attachmentIds = input({
  label: "Attachment IDs",
  type: "code",
  language: "json",
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

export const fetchAll = input({
  label: "Fetch All",
  type: "boolean",
  required: false,
  default: "false",
  comments: "When true, automatically fetches all pages of results using pagination.",
  clean: util.types.toBool,
});

export const nextPageToken = input({
  label: "Next Page Token",
  type: "string",
  placeholder: "Enter next page token",
  required: false,
  comments:
    "The pagination cursor returned from a previous response. Use it to fetch the next page of results. Leave empty for the first page.",
  clean: toOptionalString,
});

export const fields = input({
  label: "Fields",
  type: "string",
  placeholder: "Enter fields to return",
  required: false,
  example: "summary,status,assignee,priority",
  comments:
    "A comma-separated list of fields to include in each returned issue. Defaults to common navigable fields (summary, status, assignee, reporter, priority, issuetype, project, created, updated). Use `*all` to return every field.",
  clean: util.types.toString,
});

export const eventTypes = input({
  label: "Event Types",
  type: "string",
  collection: "valuelist",
  required: true,
  model: JIRA_ISSUE_EVENTS,
  placeholder: "Select event type",
  comments: "One or more Jira issue events that will trigger this webhook.",
  example: "jira:issue_created",
});

export const jqlFilter = input({
  label: "JQL Filter",
  type: "string",
  required: true,
  comments:
    "JQL (Jira Query Language) filter to limit which issues trigger the webhook. For more information, see [JQL Documentation](https://support.atlassian.com/jira-software-cloud/docs/use-advanced-search-with-jira-query-language-jql/).",
  example: "project = PROJ AND status = Done",
  placeholder: "Enter JQL query",
  clean: util.types.toString,
});

export const fieldIdsFilter = input({
  label: "Field IDs Filter",
  type: "string",
  collection: "valuelist",
  required: false,
  comments:
    "An optional list of field IDs to monitor. Only changes to these specific fields will trigger the webhook. Leave empty to monitor all field changes.",
  example: "summary",
  placeholder: "Enter field IDs",
});

export const eventsWebhookInputs = {
  jiraConnection: connectionInput,
  eventTypes,
  jqlFilter,
  fieldIdsFilter,
};



const pollJqlFilter = input({
  label: "Additional JQL Filter",
  type: "string",
  required: false,
  comments:
    "Optional JQL clause appended (with AND) to the built-in `updated >= <lastPolledAt>` filter. Use to narrow results by project, type, assignee, etc.",
  example: "project = PROJ AND issuetype = Bug",
  placeholder: "project = PROJ",
  clean: toOptionalString,
});

const showNewIssues = input({
  label: "Show New Issues",
  type: "boolean",
  required: false,
  default: "true",
  example: "true",
  comments:
    "When enabled, issues created since the last poll will be included in the trigger output.",
  clean: util.types.toBool,
});

const showUpdatedIssues = input({
  label: "Show Updated Issues",
  type: "boolean",
  required: false,
  default: "true",
  example: "true",
  comments:
    "When enabled, issues updated since the last poll will be included in the trigger output.",
  clean: util.types.toBool,
});


export const pollChangesInputs = {
  jiraConnection: connectionInput,
  pollJqlFilter,
  showNewIssues,
  showUpdatedIssues,
};

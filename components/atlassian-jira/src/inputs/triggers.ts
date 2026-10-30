import { input, util } from "@prismatic-io/spectral";
import { JIRA_ISSUE_EVENTS } from "../constants";
import { lookBackDateClean, toOptionalString } from "../util";
import { connectionInput } from "./common";

const eventTypes = input({
  label: "Event Types",
  type: "string",
  collection: "valuelist",
  required: true,
  model: JIRA_ISSUE_EVENTS,
  placeholder: "Select event type",
  comments: "One or more Jira issue events that will trigger this webhook.",
  example: "jira:issue_created",
});

const jqlFilter = input({
  label: "JQL Filter",
  type: "string",
  required: true,
  comments:
    "JQL (Jira Query Language) filter to limit which issues trigger the webhook. For more information, see [JQL Documentation](https://support.atlassian.com/jira-software-cloud/docs/use-advanced-search-with-jira-query-language-jql/).",
  example: "project = PROJ AND status = Done",
  placeholder: "Enter JQL query",
  clean: util.types.toString,
});

const fieldIdsFilter = input({
  label: "Field IDs Filter",
  type: "string",
  collection: "valuelist",
  required: false,
  comments:
    "An optional list of field IDs to monitor. Only changes to these specific fields will trigger the webhook. Leave empty to monitor all field changes.",
  example: "summary",
  placeholder: "Enter field IDs",
});

export const webhookEventsInputs = {
  jiraConnection: connectionInput,
  eventTypes,
  jqlFilter,
  fieldIdsFilter,
};

const lookBackDate = input({
  label: "Look-back Date",
  placeholder: "Enter look-back date (YYYY-MM-DD)",
  type: "string",
  required: false,
  comments:
    "The date the initial sync starts from, in YYYY-MM-DD format. Cannot be a future date. Leave empty to start from the first recurrence with no backfill. When set, the initial sync seeds each issue created or updated on or after this date once, ignoring the visibility filters.",
  example: "2026-01-01",
  clean: lookBackDateClean,
});

const pollJqlFilter = input({
  label: "Additional JQL Filter",
  type: "string",
  required: false,
  comments:
    "Optional JQL clause appended (with AND) to the built-in `updated >=` last-poll filter. Use to narrow results by project, type, assignee, etc.",
  example: "project = PROJ AND issuetype = Bug",
  placeholder: "Enter additional JQL clause",
  clean: toOptionalString,
});

const showNewIssues = input({
  label: "Show New Issues",
  type: "boolean",
  required: false,
  default: "true",
  example: "true",
  comments:
    "When true, includes issues created since the last poll in the trigger output.",
  clean: util.types.toBool,
});

const showUpdatedIssues = input({
  label: "Show Updated Issues",
  type: "boolean",
  required: false,
  default: "true",
  example: "true",
  comments:
    "When true, includes issues updated since the last poll in the trigger output.",
  clean: util.types.toBool,
});

export const pollChangesTriggerInputs = {
  jiraConnection: connectionInput,
  lookBackDate,
  pollJqlFilter,
  showNewIssues,
  showUpdatedIssues,
};





export const JIRA_ISSUE_EVENTS = [
  { label: "Issue Created", value: "jira:issue_created" },
  { label: "Issue Updated", value: "jira:issue_updated" },
  { label: "Issue Deleted", value: "jira:issue_deleted" },
  { label: "Comment Created", value: "comment_created" },
  { label: "Comment Updated", value: "comment_updated" },
  { label: "Comment Deleted", value: "comment_deleted" },
  { label: "Issue Property Set", value: "issue_property_set" },
  { label: "Issue Property Deleted", value: "issue_property_deleted" },
];


export const MAX_POLLING_PAGES = 100;



export const POLLING_DEFAULT_FIELDS =
  "summary,status,issuetype,project,priority,assignee,reporter,created,updated";

export const ENDPOINTS = {
  SEARCH_JQL: "/search/jql",
};


export const ARRAY_ERROR_MESSAGE = "Records must be an array of objects";
export const EMPTY_INPUT_ERROR_MESSAGE = "JSON Records input must not be empty";
export const EMPTY_ARRAY_ERROR_MESSAGE = "Records array must not be empty";

import {
  connectionInput,
  expand,
  maxResults,
  pagination,
  projectId,
  searchString,
} from "./common";

export const getStatusListInputs = {
  jiraConnection: connectionInput,
  projectId,
  pagination,
};

export const listIssueCustomFieldsInputs = {
  jiraConnection: connectionInput,
};

export const listIssueFieldsInputs = {
  jiraConnection: connectionInput,
};

export const listIssueLinkTypesInputs = {
  jiraConnection: connectionInput,
};

export const listIssueTypesInputs = {
  jiraConnection: connectionInput,
};

export const listPrioritiesInputs = {
  jiraConnection: connectionInput,
  pagination,
};

export const queryV3Inputs = {
  jiraConnection: connectionInput,
  searchString: {
    ...searchString,
    comments:
      "The JQL query to run, sent to Jira unchanged. For syntax, see [JQL Documentation](https://support.atlassian.com/jira-software-cloud/docs/use-advanced-search-with-jira-query-language-jql/).",
    example: `status IN ("To Do", "In Progress", "Closed")`,
  },
  expand,
  maxResults,
};

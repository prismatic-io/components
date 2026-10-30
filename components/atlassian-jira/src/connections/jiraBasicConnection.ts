import { getAtlassianBasicAuthConnection } from "atlassian-utils";
import { versionInput } from "./versionInput";

export const jiraBasicConnection = getAtlassianBasicAuthConnection({
  key: "basic",
  display: {
    label: "Basic Authentication",
    description: "Authenticate using username and API token.",
  },
  comments: {
    username: "The Jira username or email address used for authentication.",
    password:
      "The Jira API token used for authentication. Cloud users must generate an API token from [Atlassian Account Settings](https://id.atlassian.com/manage-profile/security/api-tokens).",
    host: "The hostname of the Jira instance (without https://).",
  },
  additionalInputs: { version: versionInput },
});

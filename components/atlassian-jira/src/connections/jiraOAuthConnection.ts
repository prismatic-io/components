import { getAtlassianOAuth2AuthorizationCodeConnection } from "atlassian-utils";
import { versionInput } from "./versionInput";

export const jiraOAuthConnection =
  getAtlassianOAuth2AuthorizationCodeConnection({
    key: "oauth2",
    display: {
      label: "OAuth 2.0",
      description: "Authenticate using OAuth 2.0.",
    },
    defaultScopes:
      "read:jira-user read:jira-work write:jira-work manage:jira-project manage:jira-configuration manage:jira-webhook offline_access",
    comments: {
      authorizeUrl: "The OAuth 2.0 Authorization URL for Jira.",
      tokenUrl: "The OAuth 2.0 Token URL for Jira.",
      scopes:
        "Space-delimited list of OAuth scopes for Jira access. For more information, see [Jira OAuth 2.0 Scopes](https://developer.atlassian.com/cloud/jira/platform/scopes-for-oauth-2-3LO-and-forge-apps/).",
      clientId: "The OAuth 2.0 Client ID from the Atlassian Developer Console.",
      clientSecret:
        "The OAuth 2.0 Client Secret from the Atlassian Developer Console.",
      apiSiteOverride:
        "Optional site name or URL to connect to. By default, connects to the first Jira site the user has access to. Use this if multiple Jira sites are available.",
    },
    additionalInputs: { version: versionInput },
  });

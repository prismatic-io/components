import { getAtlassianOAuth2ClientCredentialsConnection } from "atlassian-utils";
import { versionInput } from "./versionInput";

export const jiraOAuthClientCredentialsConnection =
  getAtlassianOAuth2ClientCredentialsConnection({
    key: "jiraOauth2ClientCredentials",
    display: {
      label: "OAuth 2.0 Client Credentials",
      description: "Authenticate using OAuth 2.0 Client Credentials.",
    },
    defaultScopes:
      "read:jira-user read:jira-work write:jira-work manage:jira-project manage:jira-configuration manage:jira-webhook",
    comments: {
      tokenUrl: "The OAuth 2.0 Token URL for Jira.",
      scopes:
        "Space-delimited list of OAuth scopes for Jira access. These must match the scopes configured when creating the OAuth 2.0 credential in Admin Hub. For more information, see [Jira OAuth 2.0 Scopes](https://developer.atlassian.com/cloud/jira/platform/scopes-for-oauth-2-3LO-and-forge-apps/).",
      clientId:
        "The OAuth 2.0 Client ID generated when creating the credential in Atlassian Admin Hub.",
      clientSecret:
        "The OAuth 2.0 Client Secret generated when creating the credential in Atlassian Admin Hub.",
      cloudId:
        "The Cloud ID of the Jira site. See [How to Find Your Cloud ID](https://support.atlassian.com/jira/kb/retrieve-my-atlassian-sites-cloud-id/) for instructions.",
    },
    additionalInputs: { version: versionInput },
  });

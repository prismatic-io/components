import type { AtlassianConnectionKeys } from "atlassian-utils";
import {
  getAtlassianBasicAuthConnection,
  getAtlassianOAuth2AuthorizationCodeConnection,
  getAtlassianOAuth2ClientCredentialsConnection,
} from "atlassian-utils";




const versionInput = {
  label: "Version",
  placeholder: "Select API version",
  type: "string",
  required: true,
  model: [
    { label: "2", value: "2" },
    { label: "3", value: "3" },
  ],
  shown: true,
  comments: "Select the Jira API version to use for requests.",
  default: "3",
} as const;

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

export const jiraOAuthConnection = getAtlassianOAuth2AuthorizationCodeConnection({
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
    clientSecret: "The OAuth 2.0 Client Secret from the Atlassian Developer Console.",
    apiSiteOverride:
      "Optional site name or URL to connect to. By default, connects to the first Jira site the user has access to. Use this if multiple Jira sites are available.",
  },
  additionalInputs: { version: versionInput },
});

export const jiraOAuthClientCredentialsConnection = getAtlassianOAuth2ClientCredentialsConnection({
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

export const CONNECTION_KEYS: AtlassianConnectionKeys = {
  oauth2: jiraOAuthConnection.key,
  basic: jiraBasicConnection.key,
  clientCredentials: jiraOAuthClientCredentialsConnection.key,
};

export default [jiraOAuthConnection, jiraOAuthClientCredentialsConnection, jiraBasicConnection];

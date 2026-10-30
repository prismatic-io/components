import type { AtlassianConnectionKeys } from "atlassian-utils";
import { jiraBasicConnection } from "./jiraBasicConnection";
import { jiraOAuthClientCredentialsConnection } from "./jiraOAuthClientCredentialsConnection";
import { jiraOAuthConnection } from "./jiraOAuthConnection";

export const CONNECTION_KEYS: AtlassianConnectionKeys = {
  oauth2: jiraOAuthConnection.key,
  basic: jiraBasicConnection.key,
  clientCredentials: jiraOAuthClientCredentialsConnection.key,
};

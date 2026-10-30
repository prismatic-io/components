import { CONNECTION_KEYS } from "./connectionKeys";
import { jiraBasicConnection } from "./jiraBasicConnection";
import { jiraOAuthClientCredentialsConnection } from "./jiraOAuthClientCredentialsConnection";
import { jiraOAuthConnection } from "./jiraOAuthConnection";

export {
  CONNECTION_KEYS,
  jiraBasicConnection,
  jiraOAuthClientCredentialsConnection,
  jiraOAuthConnection,
};

export default [
  jiraOAuthConnection,
  jiraOAuthClientCredentialsConnection,
  jiraBasicConnection,
];

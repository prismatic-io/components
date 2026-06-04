import {
  connection,
  input,
  OAuth2Type,
  oauth2Connection,
} from "@prismatic-io/spectral";

export const personalAccessToken = connection({
  key: "personalAccessToken",
  display: {
    label: "Personal Access Token",
    description: "Authenticate using a personal access token",
  },
  inputs: {
    host: input({
      label: "Host",
      type: "string",
      placeholder: "Enter hostname",
      comments:
        "The hostname of the Databricks instance. Include the entire domain name. For example, dbc-1234567890123456.cloud.databricks.com",
    }),
    apiKey: input({
      label: "Personal Access Token",
      type: "password",
      comments:
        "From Databricks, go to User Settings > Developer > Access Tokens > Manage > Generate New Token",
    }),
  },
});

export const workspaceServicePrincipal = oauth2Connection({
  key: "workspaceServicePrincipal",
  display: {
    label: "OAuth 2.0 Client Credentials",
    description: "Authenticate using OAuth 2.0 Client Credentials",
  },
  oauth2Type: OAuth2Type.ClientCredentials,
  inputs: {
    tokenUrl: {
      label: "Token URL",
      placeholder: "Enter token URL",
      type: "string",
      required: true,
      shown: true,
      comments:
        "The OAuth 2.0 Token URL for the Databricks workspace. Replace REPLACE-ME in https://dbc-REPLACE-ME.cloud.databricks.com/oidc/v1/token to reflect the workspace URL.",
      default: "https://dbc-REPLACE-ME.cloud.databricks.com/oidc/v1/token",
    },
    scopes: {
      label: "Scopes",
      placeholder: "Enter OAuth scopes",
      type: "string",
      required: true,
      shown: true,
      comments: "The OAuth scopes to request. Defaults to all-apis.",
      default: "all-apis",
    },
    clientId: {
      label: "Service Principal Client ID",
      type: "string",
      required: true,
      shown: true,
      placeholder: "Enter client ID",
      comments:
        "The client ID of the Databricks Service Principal. The service principal must be granted the necessary permissions in the Databricks workspace. https://docs.databricks.com/en/dev-tools/auth/oauth-m2m.html#step-2-assign-workspace-level-permissions-to-the-databricks-service-principal",
      example: "00000000-0000-0000-0000-000000000000",
    },
    clientSecret: {
      label: "Service Principal Client Secret",
      type: "password",
      required: true,
      shown: true,
      comments: "The client secret of the Databricks Service Principal.",
      example: "dose00000000000000000000000000000000",
    },
  },
});

export default [workspaceServicePrincipal, personalAccessToken];

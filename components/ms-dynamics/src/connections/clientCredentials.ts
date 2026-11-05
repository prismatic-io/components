import { OAuth2Type, oauth2Connection } from "@prismatic-io/spectral";

export const clientCredentials = oauth2Connection({
  key: "clientCredentials",
  display: {
    label: "OAuth 2.0 Client Credentials",
    description: "Authenticate requests using OAuth 2.0 Client Credentials.",
  },
  oauth2Type: OAuth2Type.ClientCredentials,
  inputs: {
    webApiUrl: {
      label: "Web API URL",
      placeholder: "Web API URL",
      type: "string",
      required: true,
      shown: true,
      comments: "The organization's Microsoft Dynamics 365 Web API URL.",
      example: "https://REPLACE-ME.api.crm.dynamics.com/",
    },
    tokenUrl: {
      label: "Token URL",
      placeholder: "Token URL",
      type: "string",
      required: true,
      shown: true,
      comments:
        "The OAuth 2.0 token endpoint. This can be found in the Azure portal under the app's 'Endpoints' menu.",
      example:
        "https://login.microsoftonline.com/00000000-0000-0000-0000-000000000000/oauth2/v2.0/token",
    },
    scopes: {
      label: "Scopes",
      placeholder: "Scopes",
      type: "string",
      required: true,
      shown: true,
      comments:
        "The OAuth 2.0 scope. Use the Dynamics Web API URL with '/.default' appended (e.g., https://my-org.api.crm.dynamics.com/.default).",
      example: "https://REPLACE-ME.api.crm.dynamics.com/.default",
    },
    clientId: {
      label: "Client ID",
      placeholder: "Client ID",
      type: "string",
      required: true,
      shown: true,
      comments: "Generated when registering an application in the Azure portal.",
    },
    clientSecret: {
      label: "Client secret value",
      placeholder: "Client secret value",
      type: "password",
      required: true,
      shown: true,
      comments: "Generated when registering an application in the Azure portal.",
    },
  },
});

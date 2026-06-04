import { OAuth2Type, oauth2Connection } from "@prismatic-io/spectral";

export const oauth2 = oauth2Connection({
  oauth2Type: OAuth2Type.AuthorizationCode,
  key: "oauth2",
  display: {
    label: "OAuth 2.0 Authorization Code",
    description: "Authenticate requests using OAuth 2.0 Authorization Code.",
  },
  inputs: {
    webApiUrl: {
      label: "Web API URL",
      placeholder: "Web API URL",
      type: "string",
      required: true,
      shown: true,
      comments: "The organization's Microsoft Dynamics 365 Web API URL.",
      example: "https://my-org.api.crm.dynamics.com/",
    },
    authorizeUrl: {
      label: "Authorize URL",
      placeholder: "Authorize URL",
      type: "string",
      required: true,
      shown: false,
      comments: "The OAuth 2.0 Authorization URL for Microsoft Dynamics 365.",
      default: "https://login.microsoftonline.com/organizations/oauth2/v2.0/authorize",
    },
    tokenUrl: {
      label: "Token URL",
      placeholder: "Token URL",
      type: "string",
      required: true,
      shown: false,
      comments: "The OAuth 2.0 Token URL for Microsoft Dynamics 365.",
      default: "https://login.microsoftonline.com/organizations/oauth2/v2.0/token",
    },
    scopes: {
      label: "Scopes",
      placeholder: "Scopes",
      type: "string",
      required: false,
      shown: true,
      example: "https://REPLACE-ME.crm.dynamics.com/user_impersonation offline_access",
      comments:
        "A space-delimited set of one or more scopes to get the user's permission to access.",
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
      label: "Client Secret",
      placeholder: "Client Secret",
      type: "password",
      required: true,
      shown: true,
      comments: "Generated when registering an application in the Azure portal.",
    },
  },
});

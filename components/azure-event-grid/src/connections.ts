import { oauth2Connection, OAuth2Type } from "@prismatic-io/spectral";





























































export const azureEventGridOauth = oauth2Connection({
  key: "azure-event-grid-oauth2",
  display: {
    description: "Authenticate using OAuth 2.0",
    label: "OAuth 2.0",
  },
  oauth2Type: OAuth2Type.AuthorizationCode,
  comments: "OAuth 2.0 Connectivity for Microsoft Event Grid",
  inputs: {
    authorizeUrl: {
      label: "Authorize URL",
      placeholder: "Authorize URL",
      type: "string",
      required: true,
      shown: true,
      comments:
        "The OAuth 2.0 Authorization URL for your Microsoft Event Grid.",
      default: "https://login.microsoftonline.com/common/oauth2/v2.0/authorize",
    },
    tokenUrl: {
      label: "Token URL",
      placeholder: "Token URL",
      type: "string",
      required: true,
      shown: true,
      comments: "The OAuth 2.0 Token URL for your Microsoft Event Grid",
      default: "https://login.microsoftonline.com/common/oauth2/v2.0/token",
    },
    scopes: {
      label: "Scopes",
      placeholder: "https://management.azure.com/.default offline_access",
      type: "string",
      required: true,
      shown: false,
      comments: "Microsoft Event Grid Scopes.",
      default: "https://management.azure.com/.default offline_access",
    },
    clientId: {
      label: "Client ID",
      placeholder: "Client ID",
      type: "string",
      required: true,
      shown: true,
      comments: "Get this value from your App Registration in the Azure Portal",
    },
    clientSecret: {
      label: "Client Secret",
      placeholder: "Client Secret",
      type: "password",
      required: true,
      shown: true,
      comments: "Get this value from your App Registration in the Azure Portal",
    },
  },
});

export default [azureEventGridOauth];

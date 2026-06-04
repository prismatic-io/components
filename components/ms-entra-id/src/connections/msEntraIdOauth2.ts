import { OAuth2Type, oauth2Connection } from "@prismatic-io/spectral";

export const msEntraIdOauth2 = oauth2Connection({
  key: "msEntraIdOauth2",
  display: {
    label: "OAuth 2.0",
    description: "Authenticate using OAuth 2.0",
  },
  oauth2Type: OAuth2Type.AuthorizationCode,
  inputs: {
    authorizeUrl: {
      label: "Authorize URL",
      placeholder: "Enter Authorize URL",
      type: "string",
      required: true,
      shown: true,
      comments: "The OAuth 2.0 authorization endpoint for Microsoft Entra ID.",
      default: "https://login.microsoftonline.com/common/oauth2/v2.0/authorize",
    },
    tokenUrl: {
      label: "Token URL",
      placeholder: "Enter Token URL",
      type: "string",
      required: true,
      shown: true,
      comments: "The OAuth 2.0 token endpoint for Microsoft Entra ID.",
      default: "https://login.microsoftonline.com/common/oauth2/v2.0/token",
    },
    scopes: {
      label: "Scopes",
      placeholder: "Enter OAuth scopes",
      type: "string",
      required: false,
      shown: true,
      comments: "Space-separated list of OAuth permission scopes to request.",
      default:
        "Group.ReadWrite.All GroupMember.ReadWrite.All Application.ReadWrite.All User.Read.All offline_access",
    },
    clientId: {
      label: "Client ID",
      placeholder: "Enter Client ID",
      type: "string",
      required: true,
      shown: true,
      comments: "The Client ID from the App Registration in the Azure Portal.",
    },
    clientSecret: {
      label: "Client Secret",
      placeholder: "Enter Client Secret",
      type: "password",
      required: true,
      shown: true,
      comments:
        "The Client Secret from the App Registration in the Azure Portal.",
    },
  },
});

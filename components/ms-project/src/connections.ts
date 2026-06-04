import { OAuth2Type, oauth2Connection } from "@prismatic-io/spectral";

export const oauth = oauth2Connection({
  key: "oauth",
  display: {
    description: "OAuth 2.0 Connectivity for Microsoft Project",
    label: "OAuth 2.0",
  },
  oauth2Type: OAuth2Type.AuthorizationCode,
  inputs: {
    authorizeUrl: {
      label: "Authorize URL",
      placeholder: "Authorize URL",
      type: "string",
      required: true,
      shown: true,
      comments: "The OAuth 2.0 Authorization URL for Microsoft Project",
      default: "https://login.microsoftonline.com/common/oauth2/authorize",
      example: "https://login.microsoftonline.com/common/oauth2/authorize",
    },
    tokenUrl: {
      label: "Token URL",
      placeholder: "Token URL",
      type: "string",
      required: true,
      shown: true,
      comments:
        "The OAuth 2.0 Token URL for Microsoft Project; replace `<pwaSite>` with the protocol and domain of the PWA Site. Example: https://example.sharepoint.com",
      example: "https://login.microsoftonline.com/common/oauth2/token?resource=<pwaSite>",
    },
    
    scopes: {
      label: "Scopes",
      placeholder: "Scopes",
      type: "string",
      required: false,
      shown: false,
      default: "",
    },
    clientId: {
      label: "Client ID",
      placeholder: "Client ID",
      type: "string",
      required: true,
      shown: true,
      comments:
        "This value is obtained by creating a new app in Active Directory with the same tenant as your user with a Microsoft Project license",
    },
    clientSecret: {
      label: "Client Secret",
      placeholder: "Client Secret",
      type: "password",
      required: true,
      shown: true,
      comments: "This value can be generated inside your Active Directory application.",
    },
    pwaSite: {
      label: "PWA Site",
      type: "string",
      example: "https://example.sharepoint.com",
      required: true,
      comments:
        "The Project Web App Sharepoint Site domain. This is the same value that is supplied for the resource argument of the Token URL.",
    },
  },
});

export default [oauth];

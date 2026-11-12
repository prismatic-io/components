import { oauth2Connection, OAuth2Type } from "@prismatic-io/spectral";

export const docusignOauthConnection = oauth2Connection({
  key: "docusignOauthConnection",
  display: {
    label: "OAuth 2.0",
    description: "Authenticate requests to DocuSign using OAuth 2.0.",
  },
  oauth2Type: OAuth2Type.AuthorizationCode,
  inputs: {
    authorizeUrl: {
      label: "Authorize URL",
      placeholder: "Authorize URL",
      type: "string",
      default: "https://account-d.docusign.com/oauth/auth",
      model: [
        {
          label: "Developer Environment",
          value: "https://account-d.docusign.com/oauth/auth",
        },
        {
          label: "Production Environment",
          value: "https://account.docusign.com/oauth/auth",
        },
      ],
      required: true,
      shown: true,
      comments: "The OAuth 2.0 Authorization URL for the API",
    },
    tokenUrl: {
      label: "Token URL",
      placeholder: "Token URL",
      type: "string",
      default: "https://account-d.docusign.com/oauth/token",
      model: [
        {
          label: "Developer Environment",
          value: "https://account-d.docusign.com/oauth/token",
        },
        {
          label: "Production Environment",
          value: "https://account.docusign.com/oauth/token",
        },
      ],
      required: true,
      shown: true,
      comments: "The OAuth 2.0 Token URL for the API",
    },
    scopes: {
      label: "Scopes",
      placeholder: "Scopes",
      type: "string",
      required: true,
      shown: false,
      default: "signature",
    },
    clientId: {
      label: "Integration Key",
      placeholder: "Integration Key",
      type: "string",
      required: true,
      shown: true,
      comments:
        "The Integration Key of the DocuSign app, listed under My Apps & Keys in the DocuSign developer account.",
    },
    clientSecret: {
      label: "Secret Key",
      placeholder: "Secret Key",
      type: "password",
      required: true,
      shown: true,
      comments:
        "A Secret Key generated for the DocuSign app under My Apps & Keys in the DocuSign developer account.",
    },
    headers: {
      label: "Authorization Header",
      type: "string",
      collection: "keyvaluelist",
      required: false,
      shown: true,
      comments:
        "Leave blank. The Integration Key and Secret Key are sent to DocuSign as a Basic Authorization header automatically. Connections that already supply a hand-built header keep working.",
    },
    useLiveEnvironment: {
      label: "Use Live Environment",
      comments: "Use the live DocuSign API environment",
      type: "boolean",
      required: false,
      default: "false",
    },
  },
});

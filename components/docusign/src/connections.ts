import { oauth2Connection, OAuth2Type } from "@prismatic-io/spectral";

export const docusignOauthConnection = oauth2Connection({
  key: "docusignOauthConnection",
  display: {
    label: "OAuth 2.0",
    description: "OAuth 2.0 connection for DocuSign",
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
      comments: "Integration Identifier of your app for the API",
    },
    clientSecret: {
      label: "Secret Key",
      placeholder: "Secret Key",
      type: "password",
      required: true,
      shown: true,
      comments: "Secret Key of your app for the API",
    },
    headers: {
      label: "Authorization Header",
      type: "string",
      collection: "keyvaluelist",
      required: true,
      shown: true,
      comments:
        "You must supply an Authorization header to get a token. Key input value should be 'Authorization' and Headers value should be 'Basic <base64 encoded integration_key:secret_key>'",
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

export default [docusignOauthConnection];

import {
  connection,
  oauth2Connection,
  OAuth2Type,
  templateConnectionInputs,
} from "@prismatic-io/spectral";

export const oauth = oauth2Connection({
  key: "oauth",
  label: "OAuth 2.0",
  display: {
    label: "OAuth 2.0",
    description: "OAuth 2.0 flow",
  },
  oauth2Type: OAuth2Type.AuthorizationCode,
  inputs: {
    authorizeUrl: {
      label: "Authorize URL",
      placeholder: "Authorize URL",
      type: "string",
      required: true,
      shown: false,
      default: "https://zoom.us/oauth/authorize",
      comments: "The OAuth 2.0 Authorization URL for Zoom.",
    },
    tokenUrl: {
      label: "Token URL",
      placeholder: "Token URL",
      type: "string",
      required: true,
      shown: false,
      default: "https://zoom.us/oauth/token",
      comments: "The OAuth 2.0 Token URL for Zoom.",
    },
    scopes: {
      label: "Scopes",
      placeholder: "Scopes",
      type: "string",
      required: false,
      shown: false,
      default: "",
      comments: "Scopes are configured when a Zoom OAuth 2.0 app is created.",
    },
    clientId: {
      label: "Client ID",
      placeholder: "Client ID",
      example: "Xh2mKp8eL9qRZtvn3JcWY",
      type: "string",
      required: true,
      shown: true,
      comments: "Client Identifier of your app for Zoom.",
    },
    clientSecret: {
      label: "Client Secret",
      placeholder: "Client Secret",
      type: "password",
      example: "9Xk7Lm2QaT6v8eZR1BjH4NW83YdpT54C",
      required: true,
      shown: true,
      comments: "Client Secret of your app for Zoom.",
    },
  },
});

export const serverToServerConnection = oauth2Connection({
  key: "serverToServer",
  label: "Server to Server",
  oauth2Type: OAuth2Type.ClientCredentials,
  display: {
    label: "Server to Server",
    description: "Server to Server connection",
  },
  inputs: templateConnectionInputs(
    {
      clientId: {
        label: "Client ID",
        placeholder: "Client ID",
        example: "Xy_TnL72KMEpWqJZAVb9Hr",
        type: "string",
        required: true,
        shown: true,
        comments: "Client Identifier of your server to server app for Zoom.",
      },
      clientSecret: {
        label: "Client Secret",
        placeholder: "Client Secret",
        example: "9Xk7Lm2QaT6v8eZR1BjH4NW83YdpT54C",
        type: "password",
        required: true,
        shown: true,
        comments: "Client Secret of your server to server app for Zoom.",
      },
      accountId: {
        label: "Account ID",
        placeholder: "Account ID",
        example: "J-x8MT9LWqvDNFuzKAbR3Z",
        type: "string",
        required: true,
        shown: true,
        comments: "Account Identifier of your server to server app for Zoom.",
      },
      scopes: {
        label: "Scopes",
        placeholder: "Scopes",
        type: "string",
        required: false,
        shown: false,
      },
    },
    {
      tokenUrl: {
        label: "Token URL",
        placeholder: "Token URL",
        type: "template",
        required: true,
        templateValue:
          "https://zoom.us/oauth/token?grant_type=account_credentials&account_id={{#accountId}}",
      },
    },
    OAuth2Type.ClientCredentials,
  ),
});

export default [oauth, serverToServerConnection];

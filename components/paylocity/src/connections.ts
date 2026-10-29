import {
  connection,
  OAuth2Type,
  oauth2Connection,
} from "@prismatic-io/spectral";
import { environment } from "./inputs";

export const v1Environment = {
  Production: {
    value: "https://dc1prodgwext.paylocity.com/",
    scopes: "all",
    tokenUrl: "https://dc1prodgwext.paylocity.com/public/security/v1/token",
  },
  Testing: {
    value: "https://dc1demogwext.paylocity.com/",
    scopes: "all",
    tokenUrl: "https://dc1demogwext.paylocity.com/public/security/v1/token",
  },
};

export const v2Environment = {
  Production: {
    value: "https://api.paylocity.com/api/v2",
    scopes: "WebLinkAPI",
    tokenUrl: "https://api.paylocity.com/IdentityServer/connect/token",
  },
  Testing: {
    value: "https://apisandbox.paylocity.com/api/v2",
    scopes: "WebLinkAPI",
    tokenUrl: "https://apisandbox.paylocity.com/IdentityServer/connect/token",
  },
};

const tokenUrlV2 = [
  {
    value: "https://api.paylocity.com/IdentityServer/connect/token",
    label: "Production",
  },
  {
    value: "https://apisandbox.paylocity.com/IdentityServer/connect/token",
    label: "Testing",
  },
];

const tokenUrlV1 = [
  {
    value: "https://dc1prodgwext.paylocity.com/public/security/v1/token",
    label: "Production",
  },
  {
    value: "https://dc1demogwext.paylocity.com/public/security/v1/token",
    label: "Testing",
  },
];

export const paylocityOAuth = oauth2Connection({
  key: "oauth2",
  oauth2Type: OAuth2Type.ClientCredentials,
  display: {
    label: "OAuth 2.0",
    description: "OAuth 2.0 connection for Paylocity",
  },
  inputs: {
    environment,
    scopes: {
      label: "Scopes",
      placeholder: "Scopes",
      type: "string",
      default: "WebLinkAPI",
      shown: false,
      required: true,
    },
    tokenUrl: {
      label: "Token URL",
      placeholder: "Token URL",
      type: "string",
      required: true,
      shown: true,
      model: tokenUrlV2,
      comments: "Select the environment to fetch the token from.",
    },
    clientId: {
      label: "Client ID",
      placeholder: "Client ID",
      type: "string",
      required: true,
      shown: true,
      comments:
        "Provide the Client Id you received from the Paylocity Developer Console.",
    },
    clientSecret: {
      label: "Client Secret",
      placeholder: "Client Secret",
      type: "password",
      required: true,
      shown: true,
      comments:
        "Provide the Client Secret you received from the Paylocity Developer Console.",
    },
  },
});

export const paylocityOAuthV1 = connection({
  key: "payEntryOAuth2",
  display: {
    label: "OAuth 2.0 (Pay Entry)",
    description: "OAuth 2.0 connection for Paylocity Pay Entry",
  },
  inputs: {
    environment,
    scopes: {
      label: "Scopes",
      placeholder: "Scopes",
      type: "string",
      default: "all",
      shown: false,
      required: true,
    },
    tokenUrl: {
      label: "Token URL",
      placeholder: "Token URL",
      type: "string",
      required: true,
      shown: true,
      model: tokenUrlV1,
      comments: "Select the environment to fetch the token from.",
    },
    clientId: {
      label: "Client ID",
      placeholder: "Client ID",
      type: "string",
      required: true,
      shown: true,
      comments:
        "Provide the Client Id you received from the Paylocity Developer Console.",
    },
    clientSecret: {
      label: "Client Secret",
      placeholder: "Client Secret",
      type: "password",
      required: true,
      shown: true,
      comments:
        "Provide the Client Secret you received from the Paylocity Developer Console.",
    },
  },
});

export default [paylocityOAuth, paylocityOAuthV1];

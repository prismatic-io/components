import { type ConnectionInput, oauth2Connection, OAuth2Type } from "@prismatic-io/spectral";
import {
  getMicrosoftCertificateCredentialsConnection,
  getMicrosoftOAuth2AuthorizationCodeConnection,
  getMicrosoftOAuth2ClientCredentialsConnection,
  ConnectionKeys,
} from "ms-utils";

import { DEFAULT_SCOPES } from "./constants";

const source: ConnectionInput = {
  label: "Source",
  type: "string",
  required: true,
  shown: false,
  default: "SharePoint",
};

export const templatedOauth = getMicrosoftOAuth2AuthorizationCodeConnection({
  key: ConnectionKeys.SharepointTemplatedOauth,
  defaultScopes: DEFAULT_SCOPES,
  additionalInputs: {
    source,
  },
});

export const oauthClientCredentials = getMicrosoftOAuth2ClientCredentialsConnection({
  key: ConnectionKeys.OauthClientCredentials,
});

export const certificateCredentials = getMicrosoftCertificateCredentialsConnection({
  key: ConnectionKeys.CertificateCredentials,
});

export const oauth = oauth2Connection({
  key: ConnectionKeys.SharedOauth,
  display: {
    label: "Microsoft SharePoint OAuth 2.0 (Deprecated)",
    description: "Authenticates actions in the Microsoft SharePoint component.",
  },
  oauth2Type: OAuth2Type.AuthorizationCode,
  inputs: {
    baseUrl: {
      label: "Base URL",
      placeholder: "https://graph.microsoft.com",
      example: "https://graph.microsoft.com",
      default: "https://graph.microsoft.com",
      type: "string",
      required: true,
      shown: true,
      comments:
        "The base URL for the Microsoft Graph API. Depending on your cloud environment, you can choose the correct one [here](https://learn.microsoft.com/en-us/graph/deployments#microsoft-graph-and-graph-explorer-service-root-endpoints).",
    },
    authorizeUrl: {
      label: "Authorize URL",
      placeholder: "Enter authorize URL",
      type: "string",
      required: true,
      shown: true,
      comments: "Provide a tenant specific OAuth 2.0 authorize endpoint.",
      default: "https://login.microsoftonline.com/common/oauth2/v2.0/authorize",
    },
    tokenUrl: {
      label: "Token URL",
      placeholder: "Enter token URL",
      type: "string",
      required: true,
      shown: true,
      comments: "Provide a tenant specific OAuth 2.0 token endpoint.",
      default: "https://login.microsoftonline.com/common/oauth2/v2.0/token",
    },
    scopes: {
      label: "Scopes",
      placeholder: "Enter space-separated scopes",
      type: "string",
      required: true,
      shown: true,
      comments: "Space separated OAuth 2.0 permission scopes.",
      default: DEFAULT_SCOPES,
    },
    clientId: {
      label: "Client ID",
      placeholder: "Enter Client ID",
      type: "string",
      required: true,
      shown: true,
      comments: "Client Id of your Azure application.",
    },
    clientSecret: {
      label: "Client Secret",
      placeholder: "Enter Client Secret",
      type: "password",
      required: true,
      shown: true,
      comments: "Client Secret generated under 'Certificates & Secrets' in your Azure application.",
    },
    
    source,
  },
});

export default [templatedOauth, oauthClientCredentials, certificateCredentials, oauth];

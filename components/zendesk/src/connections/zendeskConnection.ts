import {
  OAuth2PkceMethod,
  OAuth2Type,
  oauth2Connection,
} from "@prismatic-io/spectral";
export const zendeskConnection = oauth2Connection({
  oauth2Type: OAuth2Type.AuthorizationCode,
  key: "oauth2",
  display: {
    label: "OAuth 2.0 (Deprecated)",
    description: "Authenticate using OAuth 2.0. (Deprecated)",
  },
  oauth2PkceMethod: OAuth2PkceMethod.S256,
  inputs: {
    authorizeUrl: {
      label: "Authorize URL",
      placeholder: "Authorize URL",
      type: "string",
      required: true,
      shown: true,
      comments: "The OAuth 2.0 Authorization URL for Zendesk.",
      example: "https://acme-inc.zendesk.com/oauth/authorizations/new",
      default:
        "https://YOUR-ZENDESK-DOMAIN.zendesk.com/oauth/authorizations/new",
    },
    tokenUrl: {
      label: "Token URL",
      placeholder: "Token URL",
      type: "string",
      required: true,
      shown: true,
      comments: "The OAuth 2.0 Token URL for Zendesk.",
      example: "https://acme-inc.zendesk.com/oauth/tokens",
      default: "https://YOUR-ZENDESK-DOMAIN.zendesk.com/oauth/tokens",
    },
    clientId: {
      label: "Client ID",
      placeholder: "Client ID",
      type: "string",
      required: true,
      shown: true,
      comments: "The Client ID of the OAuth application registered in Zendesk.",
    },
    clientSecret: {
      label: "Client Secret",
      placeholder: "Client Secret",
      type: "password",
      required: true,
      shown: true,
      comments:
        "The Client Secret of the OAuth application registered in Zendesk.",
    },
    scopes: {
      label: "Scopes",
      placeholder: "Scopes",
      type: "string",
      required: true,
      shown: true,
      comments:
        "A space-delimited set of one or more scopes to get the user's permission to access.",
      example: "read write",
      default: "read write",
    },
  },
});

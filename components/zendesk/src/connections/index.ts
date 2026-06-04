import {
  OAuth2PkceMethod,
  OAuth2Type,
  connection,
  oauth2Connection,
  templateConnectionInputs,
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
    scopes: {
      label: "Scopes",
      placeholder: "Scopes",
      type: "string",
      required: true,
      shown: true,
      comments:
        "A space-delimited set of one or more scopes to get the user's permission to access.",
      default: "read write",
      example: "read write",
    },
    clientId: {
      label: "Client ID",
      placeholder: "Client ID",
      type: "string",
      required: true,
      shown: true,
    },
    clientSecret: {
      label: "Client Secret",
      placeholder: "Client Secret",
      type: "password",
      required: true,
      shown: true,
    },
  },
});

export const apiTokenConnection = connection({
  key: "apiToken",
  display: {
    label: "API Token",
    description: "Authenticate requests using an API token.",
  },
  inputs: templateConnectionInputs(
    {
      zendeskDomain: {
        label: "Zendesk Sub Domain",
        type: "string",
        example: "acme-inc",
        placeholder: "acme-inc",
        required: true,
        shown: true,
        comments:
          "Your Zendesk sub domain. (e.g. if your Zendesk URL is https://acme-inc.zendesk.com, then your sub domain is acme-inc).",
        
      },
      username: {
        label: "Username",
        type: "string",
        required: true,
        shown: true,
        example: "john.doe@example.com",
        placeholder: "john.doe@example.com",
        comments:
          "Your Zendesk username. (Email address used to login to Zendesk).",
      },
      apiToken: {
        label: "API Token",
        type: "password",
        required: true,
        shown: true,
        example: "your-api-token",
        placeholder: "your-api-token",
        comments: "Your generated API token from Zendesk.",
      },
    },
    {
      domain: {
        label: "Zendesk Domain",
        type: "template",
        templateValue: "https://{{#zendeskDomain}}.zendesk.com",
      },
    },
  ),
});

export const oauth2TemplateConnection = oauth2Connection({
  oauth2Type: OAuth2Type.AuthorizationCode,
  key: "oauth2DynamicInputs",
  display: {
    label: "OAuth 2.0",
    description: "Authenticate using OAuth 2.0.",
  },
  oauth2PkceMethod: OAuth2PkceMethod.S256,
  inputs: templateConnectionInputs(
    {
      domain: {
        label: "Zendesk Sub Domain",
        type: "string",
        example: "acme-inc",
        placeholder: "acme-inc",
        required: true,
        shown: true,
        comments:
          "Your Zendesk sub domain. (e.g. if your Zendesk URL is https://acme-inc.zendesk.com, then your sub domain is acme-inc).",
      },
      scopes: {
        label: "Scopes",
        placeholder: "Scopes",
        type: "string",
        required: true,
        shown: true,
        default: "read write",
      },
      clientId: {
        label: "Client ID",
        placeholder: "Client ID",
        type: "string",
        required: true,
        shown: true,
      },
      clientSecret: {
        label: "Client Secret",
        placeholder: "Client Secret",
        type: "password",
        required: true,
        shown: true,
      },
    },
    {
      authorizeUrl: {
        label: "Authorize URL",
        placeholder: "Authorize URL",
        type: "template",
        comments: "The OAuth 2.0 Authorization URL for Zendesk.",
        templateValue:
          "https://{{#domain}}.zendesk.com/oauth/authorizations/new",
      },
      tokenUrl: {
        label: "Token URL",
        placeholder: "Token URL",
        type: "template",
        comments: "The OAuth 2.0 Token URL for Zendesk.",
        templateValue: "https://{{#domain}}.zendesk.com/oauth/tokens",
      },
    },
    OAuth2Type.AuthorizationCode,
  ),
});

export default [
  oauth2TemplateConnection,
  zendeskConnection,
  apiTokenConnection,
];

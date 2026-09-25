import {
  OAuth2PkceMethod,
  OAuth2Type,
  oauth2Connection,
  templateConnectionInputs,
} from "@prismatic-io/spectral";
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
        placeholder: "acme-inc",
        type: "string",
        required: true,
        shown: true,
        comments:
          "The Zendesk sub domain. For example, if the Zendesk URL is https://acme-inc.zendesk.com, the sub domain is acme-inc.",
        example: "acme-inc",
      },
      clientId: {
        label: "Client ID",
        placeholder: "Client ID",
        type: "string",
        required: true,
        shown: true,
        comments:
          "The Client ID of the OAuth application registered in Zendesk.",
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
        default: "read write",
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

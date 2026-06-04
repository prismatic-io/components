import {
  connection,
  oauth2Connection,
  OAuth2Type,
} from "@prismatic-io/spectral";

export const confluenceOauth = oauth2Connection({
  oauth2Type: OAuth2Type.AuthorizationCode,
  key: "oauth2",
  display: {
    label: "OAuth 2.0",
    description: "OAuth 2.0 connection for Confluence",
  },
  comments:
    "Authenticate requests to Confluence using values obtained from the developer console.",
  inputs: {
    authorizeUrl: {
      label: "Authorize URL",
      placeholder: "Enter authorize URL",
      type: "string",
      required: true,
      shown: true,
      comments: "The OAuth 2.0 Authorization URL for Confluence.",
      default:
        "https://auth.atlassian.com/authorize?audience=api.atlassian.com&prompt=consent",
    },
    tokenUrl: {
      label: "Token URL",
      placeholder: "Enter token URL",
      type: "string",
      required: true,
      shown: true,
      comments: "The OAuth 2.0 Token URL for Confluence.",
      default: "https://auth.atlassian.com/oauth/token",
    },
    scopes: {
      label: "Scopes",
      placeholder: "Enter scopes",
      type: "string",
      required: true,
      shown: true,
      default:
        "offline_access delete:attachment:confluence read:attachment:confluence write:attachment:confluence read:custom-content:confluence write:custom-content:confluence delete:custom-content:confluence read:page:confluence write:page:confluence delete:page:confluence read:space:confluence",
      comments:
        "A space-delimited set of one or more scopes to get the user's permission to access. See [Confluence OAuth 2.0 Scopes](https://developer.atlassian.com/cloud/confluence/oauth-2-3lo-apps/#scopes) for details.",
    },
    clientId: {
      label: "Client ID",
      placeholder: "Enter client ID",
      type: "string",
      required: true,
      shown: true,
      comments:
        "The OAuth 2.0 Client ID. Obtain this from your Atlassian Developer Console.",
      example: "1MDP9i8hFPTf2RcT6mdYchLgOyB9DO",
    },
    clientSecret: {
      label: "Client Secret",
      placeholder: "Client Secret",
      type: "password",
      required: true,
      shown: true,
      comments:
        "The OAuth 2.0 Client Secret. Obtain this from your Atlassian Developer Console.",
    },
    apiSiteOverride: {
      label: "API Site Override",
      placeholder: "Enter site name or URL",
      type: "string",
      required: false,
      shown: true,
      comments:
        "By default this connector connects to the first Confluence site this user has access to. If you have multiple Confluence sites, specify which one you would like to connect to using the site name or the full URL.",
      example: "example or https://example.atlassian.net",
    },
  },
});

export const basicConnection = connection({
  key: "basic",
  display: {
    label: "Basic Authentication",
    description: "Basic Authentication connection for Confluence",
  },
  inputs: {
    email: {
      label: "Email",
      placeholder: "Enter email address",
      type: "string",
      required: true,
      shown: true,
      comments:
        "Your Confluence account email address used for authentication.",
      example: "john.doe@example.com",
    },
    apiToken: {
      label: "API Token",
      placeholder: "API Token",
      type: "password",
      required: true,
      shown: true,
      comments:
        "Your Confluence API token for authentication. Generate this from your [Atlassian account settings](https://id.atlassian.com/manage-profile/security/api-tokens).",
      example: "ATATT3xFfGF0X1234567890abcdefghij",
    },
    host: {
      label: "Host",
      placeholder: "Enter Confluence host",
      type: "string",
      required: true,
      shown: true,
      comments:
        "Your Confluence site URL. Only enter your domain without the protocol.",
      example: "your-domain.atlassian.net",
    },
  },
});

export default [confluenceOauth, basicConnection];

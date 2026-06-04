import { OAuth2Type, oauth2Connection } from "@prismatic-io/spectral";

export const slackOAuth = oauth2Connection({
  oauth2Type: OAuth2Type.AuthorizationCode,
  key: "oauth2",
  display: {
    label: "OAuth 2.0",
    description: "Authenticate requests to Slack using OAuth 2.0.",
  },
  inputs: {
    authorizeUrl: {
      label: "Authorize URL",
      placeholder: "Authorize URL",
      type: "string",
      required: true,
      shown: true,
      comments:
        "The OAuth 2.0 Authorization URL for Slack. To request access to the API on behalf of a User, append a `user_scope` query parameter to the end of the Authorize URL (e.g., `https://slack.com/oauth/v2/authorize?user_scope=chat:write,channels:read,groups:read,im:read,mpim:read`).",
      default: "https://slack.com/oauth/v2/authorize",
    },
    tokenUrl: {
      label: "Token URL",
      placeholder: "Token URL",
      type: "string",
      required: true,
      shown: true,
      comments: "The OAuth 2.0 Token URL for Slack.",
      default: "https://slack.com/api/oauth.v2.access",
    },
    revokeUrl: {
      label: "Revoke URL",
      placeholder: "Revoke URL",
      type: "string",
      required: true,
      shown: true,
      comments: "The OAuth 2.0 Revocation URL for Slack.",
      default: "https://slack.com/api/auth.revoke",
    },
    scopes: {
      label: "Scopes (Bot)",
      placeholder: "Scopes",
      type: "string",
      required: false,
      shown: true,
      default:
        "chat:write chat:write.public chat:write.customize channels:read groups:read im:read mpim:read",
      example:
        "chat:write chat:write.public users:read channels:read files:read files:write channels:manage channels:history groups:history mpim:history im:history",
      comments:
        "A space-delimited set of one or more scopes used to obtain the Bot token. To access the API as a User, append a `user_scope` query parameter to the Authorize URL and set the 'Is User' flag to true.",
    },
    clientId: {
      label: "Client ID",
      placeholder: "Client ID",
      type: "string",
      required: true,
      shown: true,
      comments: "The client ID issued by Slack for the OAuth 2.0 application.",
    },
    clientSecret: {
      label: "Client Secret",
      placeholder: "Client Secret",
      type: "password",
      required: true,
      shown: true,
      comments:
        "The client secret issued by Slack for the OAuth 2.0 application.",
    },
    signingSecret: {
      label: "Signing Secret",
      placeholder: "Signing Secret",
      type: "password",
      required: true,
      shown: true,
      comments:
        "The signing secret used to verify the authenticity of inbound webhook requests from Slack.",
    },
    isUser: {
      label: "Is User",
      type: "boolean",
      required: true,
      default: "false",
      comments:
        "When true, requests access to the API as a User instead of a Bot. When enabled, the Authorize URL must include a `user_scope` query parameter. Leaving this false grants a Bot token instead.",
    },
  },
});

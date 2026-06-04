import {
  OAuth2Type,
  connection,
  oauth2Connection,
} from "@prismatic-io/spectral";

export const oauth = oauth2Connection({
  key: "oauth",
  display: {
    label: "OAuth 2.0",
    description: "OAuth 2.0 connection for Meta Ads",
  },
  oauth2Type: OAuth2Type.AuthorizationCode,

  inputs: {
    authorizeUrl: {
      default: "https://www.facebook.com/v22.0/dialog/oauth",
      label: "Authorize URL",
      type: "string",
      comments: "Provide a valid authURL for Meta Ads",
      required: true,
      shown: true,
    },
    tokenUrl: {
      label: "Token URL",
      type: "string",
      shown: true,
      comments: "Provide a valid Meta Ads version to complete the Token URL",
      default: "https://graph.facebook.com/v22.0/oauth/access_token",
      required: true,
    },
    clientId: {
      label: "App Id",
      type: "string",
      shown: true,
      example: "1233096058094633",
      comments: "Provide the App Id that was generated from your Meta Ads App.",
      required: true,
    },
    clientSecret: {
      label: "App Secret",
      type: "password",
      example: "7699008007296c1689ddd30b0cf7c924",
      shown: true,
      comments:
        "Provide the App Secret that was generated from your Meta Ads App.",
      required: true,
    },
    scopes: {
      label: "Scopes",
      type: "string",
      shown: true,
      comments:
        "Provide a valid list of scopes. A list per use case is provided on the Meta Ads docs: https://developers.facebook.com/docs/marketing-api/overview/authorization/",
      required: true,
      default:
        "ads_read ads_management pages_show_list groups_access_member_info leads_retrieval page_events pages_read_user_content public_profile",
    },
  },
});

export const clientCredentials = oauth2Connection({
  key: "meta-client-credentials",
  display: {
    label: "OAuth 2.0 Client Credentials",
    description: "OAuth 2.0 Client Credentials connection for Meta Ads",
  },
  oauth2Type: OAuth2Type.ClientCredentials,
  inputs: {
    authorizeUrl: {
      default: "https://www.facebook.com/v22.0/dialog/oauth",
      label: "Authorize URL",
      type: "string",
      comments: "Provide a valid authURL for Meta Ads",
      required: true,
      shown: true,
    },
    tokenUrl: {
      label: "Token URL",
      type: "string",
      shown: true,
      comments: "Provide a valid Meta Ads version to complete the Token URL",
      default: "https://graph.facebook.com/v22.0/oauth/access_token",
      required: true,
    },
    clientId: {
      label: "App Id",
      type: "string",
      shown: true,
      example: "1233096058094633",
      comments: "Provide the App Id that was generated from your Meta Ads App.",
      required: true,
    },
    clientSecret: {
      label: "App Secret",
      type: "password",
      example: "7699008007296c1689ddd30b0cf7c924",
      shown: true,
      comments:
        "Provide the App Secret that was generated from your Meta Ads App.",
      required: true,
    },
    scopes: {
      label: "Scopes",
      type: "string",
      shown: true,
      comments:
        "Provide a valid list of scopes. A list per use case is provided on the Meta Ads docs: https://developers.facebook.com/docs/marketing-api/overview/authorization/",
      required: true,
      default:
        "ads_read ads_management pages_show_list groups_access_member_info leads_retrieval page_events pages_read_user_content public_profile",
    },
  },
});

export const sandboxToken = connection({
  key: "sandboxToken",
  display: {
    label: "Sandbox Ad Account Token",
    description: "Use this connection to connect to a sandbox ad account.",
  },
  inputs: {
    token: {
      label: "Sandbox Token",
      type: "string",
      required: true,
      shown: true,
      comments: "A valid sandbox token for Meta Ads API",
    },
  },
});

export const conversionsToken = connection({
  key: "facebookMarketingConversionsToken",
  display: {
    label: "Access Token",
    description: "Access Token connection for Meta Ads Conversions API",
  },
  inputs: {
    token: {
      label: "Access Token",
      type: "string",
      required: true,
      shown: true,
      comments: "A valid access token for Meta Ads API",
    },
  },
});

export default [oauth, clientCredentials, conversionsToken, sandboxToken];

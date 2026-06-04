import { oauth2Connection, OAuth2Type } from "@prismatic-io/spectral";

export const oauth = oauth2Connection({
  key: "oauth",
  display: {
    label: "OAuth 2.0",
    description: "Authenticate using OAuth 2.0.",
  },
  oauth2Type: OAuth2Type.AuthorizationCode,
  inputs: {
    authorizeUrl: {
      label: "Authorize URL",
      placeholder: "Enter Authorize URL",
      type: "string",
      required: true,
      shown: true,
      comments:
        "The OAuth 2.0 Authorization URL for Acrobat Sign with the correct region/shard. This can be found in the URL when you are logged into the Adobe Sign web app. For example, if the URL is https://secure.na3.adobesign.com, the authorize URL would be 'https://secure.na3.adobesign.com/public/oauth/v2'",
      example: "https://secure.na3.adobesign.com/public/oauth/v2",
      default: "https://secure.na3.adobesign.com/public/oauth/v2",
    },
    tokenUrl: {
      label: "Token URL",
      placeholder: "Enter Token URL",
      type: "string",
      required: true,
      shown: true,
      comments:
        "The OAuth 2.0 Token URL for Acrobat Sign with the correct region/shard. This can be found in the URL when you are logged into the Adobe Sign web app. For example, if the URL is https://secure.na3.adobesign.com, the token URL would be 'https://secure.na3.adobesign.com/oauth/v2/token'",
      example: "https://secure.na3.adobesign.com/oauth/v2/token",
      default: "https://secure.na3.adobesign.com/oauth/v2/token",
    },
    refreshUrl: {
      label: "Refresh URL",
      placeholder: "Enter Refresh URL",
      type: "string",
      required: true,
      shown: true,
      comments:
        "The OAuth 2.0 Refresh URL for Acrobat Sign with the correct region/shard. This can be found in the URL when you are logged into the Adobe Sign web app. For example, if the URL is https://secure.na3.adobesign.com, the refresh URL would be 'https://secure.na3.adobesign.com/oauth/v2/refresh'",
      example: "https://secure.na3.adobesign.com/oauth/v2/refresh",
      default: "https://secure.na3.adobesign.com/oauth/v2/refresh",
    },
    scopes: {
      label: "Scopes",
      placeholder: "Enter OAuth scopes (space-separated)",
      type: "string",
      required: false,
      shown: true,
      comments:
        'Space-separated OAuth 2.0 permission scopes for Acrobat Sign. Add scope modifiers using colons. See the <a href="https://opensource.adobe.com/acrobat-sign/developer_guide/gstarted.html#configure-scopes">Acrobat Sign scopes documentation</a> for available scopes.',
      example: "user_read:account user_write:self agreement_read:group",
      default: "user_read:account user_write:self agreement_read:group",
    },
    clientId: {
      label: "Client ID",
      placeholder: "Enter Client ID",
      type: "string",
      required: true,
      shown: true,
      comments:
        "Client Identifier of your Acrobat Sign App (shown as Application ID inside Acrobat Sign).",
      example: "CBJCHBCAABAApRvVMBVyo0bIo4jdPROKiKWR9xRhRugJ",
    },
    clientSecret: {
      label: "Client Secret",
      placeholder: "Enter Client Secret",
      type: "password",
      required: true,
      shown: true,
      comments: "Client Secret of your Acrobat Sign App.",
    },
  },
});

import { OAuth2Type, oauth2Connection } from "@prismatic-io/spectral";

export const oauth2 = oauth2Connection({
  key: "oauth2",
  display: {
    label: "OAuth 2.0",
    description: "Authenticates with your Github account using OAuth 2.0",
  },
  oauth2Type: OAuth2Type.AuthorizationCode,
  inputs: {
    authorizeUrl: {
      label: "Authorize URL",
      type: "string",
      shown: false,
      required: true,
      default: "https://github.com/login/oauth/authorize",
      comments: "The OAuth 2.0 Authorization URL for GitHub.",
      example: "https://github.com/login/oauth/authorize",
    },
    tokenUrl: {
      label: "Token URL",
      type: "string",
      shown: false,
      required: true,
      default: "https://github.com/login/oauth/access_token",
      comments: "The OAuth 2.0 Token URL for GitHub.",
      example: "https://github.com/login/oauth/access_token",
    },
    scopes: {
      label: "Scopes",
      type: "string",
      shown: true,
      required: false,
      default: "",
      placeholder: "Enter scopes (space-separated)",
      example: "repo user admin:org",
      comments:
        "Space-separated list of OAuth scopes. See [GitHub's documentation](https://docs.github.com/en/developers/apps/building-oauth-apps/scopes-for-oauth-apps) for available scopes.",
    },
    clientId: {
      label: "Client ID",
      type: "string",
      shown: true,
      required: true,
      placeholder: "Enter Client ID",
      example: "Iv1.a629723000000000",
      comments: "The Client ID from your GitHub OAuth App. Find this in GitHub Settings > Developer settings > OAuth Apps.",
    },
    clientSecret: {
      label: "Client Secret",
      type: "password",
      shown: true,
      required: true,
      placeholder: "Enter Client Secret",
      comments: "The Client Secret from your GitHub OAuth App. Keep this value secure.",
    },
  },
});

export default [oauth2];

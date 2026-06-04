import {
  connection,
  OAuth2PkceMethod,
  OAuth2Type,
  oauth2Connection,
} from "@prismatic-io/spectral";

const personalDeveloperToken = connection({
  key: "personalDeveloperToken",
  display: {
    label: "Personal Developer Token",
    description:
      "Personal Developer Tokens are used for private applications or during development to skip the OAuth2 process.",
  },
  inputs: {
    baseUrl: {
      label: "Base URL",
      type: "string",
      comments:
        "The base URL of the Frontify API. This URL should be provided by the service provider.",
      placeholder: "https://my-example-domain.frontify.com/",
      example: "https://my-example-domain.frontify.com",
      required: true,
    },
    personalDeveloperToken: {
      label: "Token",
      type: "password",
      required: true,
      comments:
        "The personal developer token is used to authenticate with the Frontify API. This token should be provided by the service provider.",
    },
  },
});





const oauth2 = oauth2Connection({
  key: "frontifyOAuth2",
  display: {
    label: "OAuth 2.0",
    description: "Connection to Frontify using OAuth 2.0",
  },
  oauth2Type: OAuth2Type.AuthorizationCode,
  oauth2PkceMethod: OAuth2PkceMethod.S256,
  inputs: {
    baseUrl: {
      label: "Base URL",
      type: "string",
      comments:
        "The base URL of the Frontify API. This URL should be provided by the service provider.",
      example: "https://my-example-domain.frontify.com",
      required: true,
    },
    authorizeUrl: {
      label: "Authorize URL",
      type: "string",
      required: true,
      comments: "The Authorization URL for Frontify.",
      example: "https://my-example-domain.frontify.com/api/oauth/authorize",
    },
    tokenUrl: {
      label: "Token URL",
      type: "string",
      required: true,
      comments: "The Token URL for Frontify.",
      example: "https://my-example-domain.frontify.com/api/oauth/accesstoken",
    },
    scopes: {
      label: "Scopes",
      type: "string",
      required: true,
      comments:
        "A list of scopes, combined by a space. At least `basic:read` must be specified within scopes. A full list of scopes can be found here: https://help.frontify.com/en/articles/5402354-overview-of-frontify-developer-tools",
      placeholder: "basic:read",
    },
    clientId: {
      label: "Client ID",
      placeholder: "Client Identifier",
      type: "password",
      required: true,
    },
    clientSecret: {
      label: "Client Secret",
      placeholder: "Client Secret",
      type: "password",
      required: true,
    },
    state: {
      label: "State",
      type: "string",
      comments:
        "The state is a parameter controlled by you and used to preserves some state objects set by the client in the Authorization request and makes it available to the client in the response.",
      example: "testStateA@s432!",
    },
  },
});

export default [oauth2, personalDeveloperToken];

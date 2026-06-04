import { input } from "@prismatic-io/spectral";

export const connection = input({
  label: "Connection",
  comments:
    "Select the Gorgias connection type for this request: OAuth2 or API Key.",
  type: "connection",
  required: true,
});

const domain = input({
  label: "Domain",
  type: "string",
  required: true,
  shown: true,
  comments:
    "The domain of the Gorgias API, this is provided by the service provider.",
  example: "green-garden",
});

const authorizeUrl = input({
  label: "Authorize URL",
  type: "string",
  required: true,
  shown: true,
  comments:
    "The URL to which the user will be redirected to authorize your application. This URL should be provided by the service provider.",
  example: "https://<DOMAIN>.gorgias.com/oauth/authorize",
});

const tokenUrl = input({
  label: "Token URL",
  type: "string",
  required: true,
  shown: true,
  comments:
    "The URL used to obtain an access token from the service provider. This URL should be provided by the service provider.",
  example: "https://<DOMAIN>.gorgias.com/oauth/token",
});

const scopes = input({
  label: "Scopes",
  type: "string",
  required: false,
  shown: true,
  comments:
    "A space-separated list of permissions or access levels that your application is requesting. Each scope is a string that represents a specific permission or set of permissions.",
  example: "openid profile email write:all offline",
  default: "openid profile email write:all offline",
});

const clientId = input({
  label: "Client ID",
  type: "string",
  required: true,
  shown: true,
});

const clientSecret = input({
  label: "Client Secret",
  type: "password",
  required: true,
  shown: true,
});

const username = input({
  label: "Username",
  type: "string",
  required: true,
  comments: "Your username for Gorgias. e.g. john@example.com",
});

const apiKey = input({
  label: "API Key",
  type: "password",
  required: true,
  comments: "Your API Key for Gorgias.",
});

export const oAuth2Inputs = {
  domain,
  authorizeUrl,
  tokenUrl,
  scopes,
  clientId,
  clientSecret,
};

export const apiKeyInputs = {
  domain,
  username,
  apiKey,
};

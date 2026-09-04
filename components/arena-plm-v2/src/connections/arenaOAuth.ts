import { OAuth2Type, oauth2Connection } from "@prismatic-io/spectral";
export const arenaOAuth = oauth2Connection({
  key: "arenaOAuth",
  display: {
    label: "OAuth 2.0 Client Credentials",
    description: "Authenticate using OAuth 2.0 Client Credentials.",
  },
  oauth2Type: OAuth2Type.ClientCredentials,
  inputs: {
    baseUrl: {
      label: "Arena Environment",
      type: "string",
      required: true,
      shown: true,
      placeholder: "Select the Arena environment",
      comments:
        "Select the Arena environment region, or choose Custom URL to enter a custom URL.",
      model: [
        { label: "North America", value: "https://api.arenasolutions.com" },
        { label: "GovCloud", value: "https://api.arenagov.com" },
        { label: "Europe", value: "https://api.europe.arenaplm.com" },
        { label: "United Kingdom", value: "https://api.uk.arenaplm.com" },
        { label: "China", value: "https://api.arenaplm.cn" },
        { label: "Custom URL", value: "custom" },
      ],
      default: "https://api.arenasolutions.com",
    },
    customBaseUrl: {
      label: "Custom Arena URL",
      type: "string",
      required: false,
      shown: true,
      comments:
        "The custom Arena API base URL, used only when 'Custom URL' is selected above.",
      placeholder: "Enter a custom Arena API base URL",
      example: "https://api.arenasolutions.com",
    },
    tokenUrl: {
      label: "Token URL",
      type: "string",
      required: true,
      shown: true,
      comments:
        "The OAuth 2.0 token endpoint that issues the access token. Arena supplies this URL along with the client credentials for the machine user.",
      placeholder: "Enter the token URL supplied by Arena",
    },
    scopes: {
      label: "Scopes",
      type: "string",
      required: false,
      shown: false,
      placeholder: "Enter OAuth scopes",
      comments:
        "Arena requests no OAuth scopes for the client credentials flow.",
    },
    clientId: {
      label: "Client ID",
      type: "string",
      required: true,
      shown: true,
      placeholder: "Enter client ID",
      comments:
        "The OAuth client ID issued by Arena for the machine user. The machine user's workspace determines which workspace requests target.",
    },
    clientSecret: {
      label: "Client Secret",
      type: "password",
      required: true,
      shown: true,
      placeholder: "Enter client secret",
      comments: "The OAuth client secret issued by Arena for the machine user.",
    },
    timeout: {
      label: "Request Timeout",
      type: "string",
      required: false,
      shown: true,
      default: "30000",
      placeholder: "Enter request timeout in milliseconds",
      comments: "The request timeout in milliseconds (default: 30 seconds).",
      example: "30000",
    },
  },
});

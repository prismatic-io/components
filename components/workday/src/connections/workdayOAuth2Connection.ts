import { OAuth2Type, oauth2Connection } from "@prismatic-io/spectral";
export const workdayOAuth2Connection = oauth2Connection({
  oauth2Type: OAuth2Type.AuthorizationCode,
  key: "workdayOAuth2Connection",
  display: {
    label: "OAuth 2.0",
    description: "Authenticate using OAuth 2.0.",
  },
  inputs: {
    apiUrl: {
      label: "API URL",
      placeholder: "Enter API URL",
      type: "string",
      required: true,
      shown: true,
      comments:
        "The Workday API base URL: the host of the Workday REST API Endpoint shown in View API Clients, followed by /ccx, in the form https://{host}/ccx.",
      example: "https://wd2-impl-services1.workday.com/ccx",
    },
    authorizeUrl: {
      label: "Authorize URL",
      placeholder: "Enter authorize URL",
      type: "string",
      required: true,
      shown: true,
      comments:
        "The Authorization Endpoint shown for the API client in View API Clients, in the form https://{host}/{tenant}/authorize.",
      example: "https://impl.workday.com/acme/authorize",
    },
    tokenUrl: {
      label: "Token URL",
      placeholder: "Enter token URL",
      type: "string",
      required: true,
      shown: true,
      comments:
        "The Token Endpoint shown for the API client in View API Clients, in the form https://{host}/ccx/oauth2/{tenant}/token.",
      example: "https://wd2-impl-services1.workday.com/ccx/oauth2/acme/token",
    },
    clientId: {
      label: "Client ID",
      placeholder: "Enter client ID",
      type: "string",
      required: true,
      shown: true,
      comments:
        "The client ID shown after registering the API client with the Register API Client task in Workday.",
      example: "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
    },
    clientSecret: {
      label: "Client Secret",
      placeholder: "Enter client secret",
      type: "password",
      required: true,
      shown: true,
      comments:
        "The client secret paired with the client ID, shown once when the API client is registered.",
      example: "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
    },
    scopes: {
      label: "Scopes",
      placeholder: "Enter scopes",
      type: "string",
      required: false,
      shown: true,
      comments:
        "Space-separated OAuth 2.0 scopes to request. Leave blank to use the functional areas selected when the API client was registered.",
      example: "",
    },
  },
});

import { connection } from "@prismatic-io/spectral";

export const workdayRefreshTokenConnection = connection({
  key: "workdayRefreshTokenConnection",
  display: {
    label: "Refresh Token",
    description:
      "Authenticate using an API Client for Integrations and a refresh token generated in Workday, without browser sign-in.",
  },
  inputs: {
    restApiUrl: {
      label: "REST API Endpoint",
      placeholder: "Enter REST API endpoint",
      type: "string",
      required: true,
      shown: true,
      comments:
        "The Workday REST API Endpoint shown for the API client in View API Clients, in the form https://<host>/ccx/api/v1/<tenant>. The API base URL, tenant and token URL are derived from it.",
      example: "https://wd2-impl-services1.workday.com/ccx/api/v1/acme",
    },
    clientId: {
      label: "Client ID",
      placeholder: "Enter client ID",
      type: "string",
      required: true,
      shown: true,
      comments:
        "The client ID of the API Client for Integrations, shown after registering it in Workday.",
      example: "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
    },
    clientSecret: {
      label: "Client Secret",
      placeholder: "Enter client secret",
      type: "password",
      required: true,
      shown: true,
      comments:
        "The client secret paired with the client ID, shown once when the API Client for Integrations is registered.",
      example: "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
    },
    refreshToken: {
      label: "Refresh Token",
      placeholder: "Enter refresh token",
      type: "password",
      required: true,
      shown: true,
      comments:
        "The refresh token generated for the Integration System User with the Manage Refresh Tokens for Integrations task in Workday.",
      example: "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
    },
    tokenUrl: {
      label: "Token URL",
      placeholder: "Enter token URL",
      type: "string",
      required: false,
      shown: true,
      comments:
        "Overrides the token URL derived from the REST API Endpoint. Leave blank unless the Token Endpoint in View API Clients differs from https://<host>/ccx/oauth2/<tenant>/token.",
      example: "https://wd2-impl-services1.workday.com/ccx/oauth2/acme/token",
    },
  },
});

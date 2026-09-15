import { OAuth2Type, oauth2Connection } from "@prismatic-io/spectral";
export const serviceTitanConnection = oauth2Connection({
  key: "serviceTitanConnection",
  display: {
    description: "Authenticate using OAuth 2.0 client credentials.",
    label: "OAuth 2.0 Client Credentials",
  },
  oauth2Type: OAuth2Type.ClientCredentials,
  inputs: {
    tokenUrl: {
      label: "Token URL",
      placeholder: "Enter a token URL",
      type: "string",
      required: true,
      shown: true,
      comments:
        "The OAuth 2.0 token URL for the API. Select the appropriate environment.",
      model: [
        {
          label: "Token URL (Production)",
          value: "https://auth.servicetitan.io/connect/token",
        },
        {
          label: "Token URL (Integration)",
          value: "https://auth-integration.servicetitan.io/connect/token",
        },
      ],
    },
    scopes: {
      label: "Scopes",
      placeholder: "Enter scopes",
      type: "string",
      required: false,
      shown: false,
      comments: "Space-separated OAuth 2.0 permission scopes for the API.",
    },
    clientId: {
      label: "Client ID",
      placeholder: "Enter a client ID",
      type: "string",
      required: true,
      shown: true,
      comments:
        "The client identifier for the application, found in the ServiceTitan developer portal.",
    },
    clientSecret: {
      label: "Client Secret",
      placeholder: "Enter a client secret",
      type: "password",
      required: true,
      shown: true,
      comments:
        "The client secret for the application, found in the ServiceTitan developer portal.",
    },
    tenant: {
      label: "Tenant",
      placeholder: "Enter a tenant ID",
      type: "string",
      required: true,
      shown: true,
      comments:
        "The numeric tenant ID for the ServiceTitan account, found in the ServiceTitan developer portal alongside the application's details.",
      example: "10978752986",
    },
    applicationKey: {
      label: "Application Key",
      placeholder: "Enter an application key",
      type: "password",
      required: true,
      shown: true,
      comments:
        "The application key for the integration, found in the ServiceTitan developer portal under the application's details. Sent with every request as the ST-App-Key header.",
      example: "ak1.XXXXXXXXXXXXXXXXXXXXXXXXXX",
    },
    environment: {
      label: "Environment",
      placeholder: "Select an environment",
      type: "string",
      required: true,
      shown: true,
      comments:
        "The ServiceTitan environment to connect to. Production uses api.servicetitan.io; Integration uses the api-integration host for sandbox testing.",
      model: [
        {
          label: "Production",
          value: "production",
        },
        {
          label: "Integration",
          value: "integration",
        },
      ],
    },
  },
});

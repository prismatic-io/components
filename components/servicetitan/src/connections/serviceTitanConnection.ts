import { OAuth2Type, oauth2Connection } from "@prismatic-io/spectral";
import { applicationKey, environment, tenant } from "../inputs";
export const serviceTitanConnection = oauth2Connection({
  key: "serviceTitanConnection",
  display: {
    description: "Authenticate using OAuth 2.0 client credentials.",
    label: "OAuth 2.0 Client Credentials",
  },
  oauth2Type: OAuth2Type.ClientCredentials,
  inputs: {
    authorizeUrl: {
      label: "Authorize URL",
      placeholder: "Enter an authorize URL",
      type: "string",
      required: false,
      shown: false,
      comments: "The OAuth 2.0 authorization URL for the API.",
    },
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
      default: "",
    },
    clientId: {
      label: "Client ID",
      placeholder: "Enter a client ID",
      type: "string",
      required: true,
      shown: true,
      comments:
        "The client identifier for the application, found in the Service Titan developer portal.",
    },
    clientSecret: {
      label: "Client Secret",
      placeholder: "Enter a client secret",
      type: "password",
      required: true,
      shown: true,
      comments:
        "The client secret for the application, found in the Service Titan developer portal.",
    },
    tenant,
    applicationKey,
    environment,
  },
});

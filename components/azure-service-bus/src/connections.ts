import {
  connection,
  OAuth2Type,
  oauth2Connection,
} from "@prismatic-io/spectral";

export const oauth = oauth2Connection({
  key: "oauth",
  display: {
    description: "OAuth 2.0",
    label: "OAuth 2.0",
  },
  oauth2Type: OAuth2Type.AuthorizationCode,
  comments: "OAuth 2.0 Connectivity for Azure Service Bus",
  inputs: {
    authorizeUrl: {
      label: "Authorize URL",
      placeholder: "Authorize URL",
      type: "string",
      required: true,
      shown: true,
      comments: "The OAuth 2.0 Authorization URL for Azure Service Bus",
      default:
        "https://login.microsoftonline.com/organizations/oauth2/v2.0/authorize",
    },
    tokenUrl: {
      label: "Token URL",
      placeholder: "Token URL",
      type: "string",
      required: true,
      shown: true,
      comments: "The OAuth 2.0 Token URL for Azure Service Bus",
      default:
        "https://login.microsoftonline.com/organizations/oauth2/v2.0/token",
    },
    scopes: {
      label: "Scopes",
      placeholder: "Scopes",
      type: "string",
      required: true,
      shown: true,
      default: "https://management.azure.com/.default",
    },
    clientId: {
      label: "Client ID",
      placeholder: "Client ID",
      type: "string",
      required: true,
      shown: true,
      comments: "Generate this value when you create your Active Directory App",
    },
    clientSecret: {
      label: "Client Secret",
      placeholder: "Client Secret",
      type: "password",
      required: true,
      shown: true,
      comments: "Generate this value when you create your Active Directory App",
    },
    tenantId: {
      label: "Tenant ID",
      placeholder: "Tenant ID",
      type: "string",
      required: true,
      shown: true,
      comments: "Generate this value when you create your Active Directory App",
    },
  },
});

export const connectionString = connection({
  key: "connection-string",
  display: {
    description: "Connection String",
    label: "Connection String",
  },
  inputs: {
    connectionString: {
      label: "Connection String",
      type: "password",
      required: true,
      shown: true,
      comments:
        "The connection string for your Azure Service Bus namespace. You can find this in the Azure Portal under the 'Shared access policies' tab.",
    },
  },
});

export default [oauth, connectionString];

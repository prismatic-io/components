import {
  oauth2Connection,
  OAuth2Type,
  templateConnectionInputs,
} from "@prismatic-io/spectral";

export const cosmosDbAuthorizationCode = oauth2Connection({
  key: "cosmosDbAuthorizationCode",
  display: {
    label: "OAuth 2.0 Auth Code",
    description: "Azure Cosmos DB OAuth Connection",
  },
  oauth2Type: OAuth2Type.AuthorizationCode,
  inputs: templateConnectionInputs(
    {
      cosmosEndpoint: {
        label: "Cosmos DB Endpoint",
        type: "string",
        required: true,
        shown: true,
        comments: "Your Azure Cosmos DB account endpoint URL.",
        example: "https://your-cosmos-account.documents.azure.com:443/",
        placeholder: "https://your-cosmos-account.documents.azure.com:443/",
      },
      baseUrl: {
        label: "Base URL",
        placeholder: "https://graph.microsoft.com",
        example: "https://graph.microsoft.com",
        default: "https://graph.microsoft.com",
        type: "string",
        required: true,
        shown: true,
        comments:
          "The base URL for the Microsoft Graph API. Depending on your cloud environment, you can choose the correct one [here](https://learn.microsoft.com/en-us/graph/deployments#microsoft-graph-and-graph-explorer-service-root-endpoints).",
      },
      tenantUrl: {
        label: "Tenant URL",
        type: "string",
        required: true,
        shown: true,
        comments:
          "The tenant URL for the Microsoft Graph API. This is the URL of the tenant that you are connecting to. You can find this in the Azure portal or [here](https://learn.microsoft.com/en-us/entra/identity-platform/authentication-national-cloud#microsoft-entra-authentication-endpoints).",
        example: "login.microsoftonline.com/common",
        default: "login.microsoftonline.com/common",
        placeholder: "login.microsoftonline.com/common",
      },
      scopes: {
        label: "Scopes",
        placeholder: "Scopes",
        type: "string",
        required: false,
        shown: true,
        comments:
          "Microsoft Cosmos DB permission scopes are set on the OAuth application.",
        default: "https://cosmos.azure.com/.default",
      },
      clientId: {
        label: "Client ID",
        placeholder: "Client ID",
        type: "string",
        required: true,
        shown: true,
        comments: "Client Id of your Azure application.",
        example: "11111111-2222-3333-4444-555555555555",
      },
      clientSecret: {
        label: "Client secret value",
        placeholder: "Client secret value",
        type: "password",
        required: true,
        shown: true,
        comments:
          "Client Secret generated under 'Certificates & Secrets' in your Azure application.",
        example: "11111111-2222-3333-4444-555555555555",
      },
    },
    {
      authorizeUrl: {
        label: "Authorize URL",
        placeholder: "Authorize URL",
        type: "template",
        required: true,
        shown: false,
        comments: "The OAuth 2.0 Authorization URL for Microsoft Outlook",
        example: "login.microsoftonline.com/common",
        templateValue:
          "https://{{#tenantUrl}}/oauth2/v2.0/authorize?prompt=consent",
      },
      tokenUrl: {
        label: "Token URL",
        placeholder: "Token URL",
        type: "template",
        required: true,
        shown: false,
        comments: "The OAuth 2.0 Token URL for Microsoft Outlook",
        example: "login.microsoftonline.com/common",
        templateValue: "https://{{#tenantUrl}}/oauth2/v2.0/token",
      },
    },
    OAuth2Type.AuthorizationCode,
  ),
});

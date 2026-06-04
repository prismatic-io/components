import {
  oauth2Connection,
  OAuth2Type,
  templateConnectionInputs,
} from "@prismatic-io/spectral";

export const cosmosDbClientCredentials = oauth2Connection({
  key: "cosmosDbClientCredentials",
  display: {
    label: "OAuth 2.0 Client Credentials",
    description:
      "OAuth 2.0 Client Credentials Connectivity for Azure Cosmos DB",
  },
  oauth2Type: OAuth2Type.ClientCredentials,
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
      entraIdEndpoint: {
        label: "Microsoft Entra ID Endpoint",
        type: "string",
        required: true,
        shown: true,
        comments:
          "The Microsoft Entra ID endpoint for the Microsoft Graph API. You can find this in the Azure portal or [here](https://learn.microsoft.com/en-us/graph/deployments#app-registration-and-token-service-root-endpoints).",
        example: "https://login.microsoftonline.com",
        default: "https://login.microsoftonline.com",
        placeholder: "https://login.microsoftonline.com",
      },
      tenant: {
        label: "Tenant",
        type: "string",
        required: true,
        shown: true,
        comments:
          "The tenant ID or name for the Microsoft Graph API. This is the ID or name of the tenant that you are connecting to.",
        example: "11111111-2222-3333-4444-555555555555",
        placeholder: "11111111-2222-3333-4444-555555555555",
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
        label: "Client Secret",
        placeholder: "Client Secret",
        type: "password",
        required: true,
        shown: true,
        comments:
          "Client Secret generated under 'Certificates & Secrets' in your Azure application.",
        example: "11111111-2222-3333-4444-555555555555",
      },
      scopes: {
        label: "Scopes",
        placeholder: "https://cosmos.azure.com/.default",
        type: "string",
        required: false,
        shown: true,
        comments: "Microsoft Cosmos DB Scopes.",
        default: "https://cosmos.azure.com/.default",
      },
    },
    {
      tokenUrl: {
        label: "Token URL",
        placeholder: "Token URL",
        type: "template",
        required: true,
        shown: false,
        comments: "Provide a tenant specific OAuth 2.0 token endpoint.",
        templateValue: "{{#entraIdEndpoint}}/{{#tenant}}/oauth2/v2.0/token",
      },
    },
    OAuth2Type.ClientCredentials,
  ),
});

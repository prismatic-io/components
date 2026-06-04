import { oauth2Connection, OAuth2Type, templateConnectionInputs } from "@prismatic-io/spectral";

export const salesforceClientCredentials = oauth2Connection({
  key: "salesforceClientCredentials",
  label: "OAuth 2.0 Client Credentials",
  oauth2Type: OAuth2Type.ClientCredentials,
  display: {
    label: "OAuth 2.0 Client Credentials",
    description:
      "Authenticate using OAuth 2.0 Client Credentials for server-to-server integration.",
  },
  inputs: templateConnectionInputs(
    {
      instanceUrl: {
        label: "Instance URL",
        placeholder: "Enter Salesforce My Domain URL",
        type: "string",
        required: true,
        shown: true,
        comments:
          "The Salesforce My Domain URL (e.g., https://your-company.my.salesforce.com). For sandbox, use https://your-company--sandbox.sandbox.my.salesforce.com.",
        example: "https://acme-corp.my.salesforce.com",
      },
      clientId: {
        label: "Consumer Key",
        placeholder: "Enter consumer key",
        example: "3MVG9ZL1aBcDeFGHjklMNOpQRsTUVwXyZ1234567890abcdefg",
        type: "string",
        required: true,
        shown: true,
        comments: "The Consumer Key from the Salesforce Connected App.",
      },
      clientSecret: {
        label: "Consumer Secret",
        placeholder: "Enter consumer secret",
        type: "password",
        required: true,
        shown: true,
        comments: "The Consumer Secret from the Salesforce Connected App.",
      },
      scopes: {
        label: "Scopes",
        placeholder: "Enter OAuth scopes",
        type: "string",
        required: false,
        shown: true,
        comments: "Scopes are configured in the Salesforce Connected App settings.",
      },
    },
    {
      tokenUrl: {
        label: "Token URL",
        placeholder: "Token URL",
        type: "template",
        required: true,
        templateValue: "{{#instanceUrl}}/services/oauth2/token",
      },
    },
    OAuth2Type.ClientCredentials,
  ),
});

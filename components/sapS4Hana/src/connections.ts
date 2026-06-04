import {
  connection,
  oauth2Connection,
  OAuth2PkceMethod,
  OAuth2Type,
  templateConnectionInputs,
} from "@prismatic-io/spectral";







export const sapApiKeyConnection = connection({
  key: "apiKey",
  display: {
    label: "API Key (Sandbox)",
    description:
      "Connect to SAP S/4HANA Cloud APIs via SAP API Business Hub sandbox for testing and development. This connection provides read-only access to sample data.",
  },
  inputs: {
    apiKey: {
      label: "SAP API Key",
      placeholder: "API Key",
      type: "string",
      required: true,
      shown: true,
      comments:
        "API key from SAP API Business Hub. Log in at https://api.sap.com and access your API key from your account settings.",
      example: "AbCdEf123456...",
    },
    baseUrl: {
      label: "Base URL",
      placeholder: "https://sandbox.api.sap.com/s4hanacloud",
      type: "string",
      required: true,
      shown: true,
      default: "https://sandbox.api.sap.com/s4hanacloud",
      comments:
        "SAP API Business Hub sandbox URL. Use the default sandbox URL for testing. This connection is intended for sandbox environments only.",
      example: "https://sandbox.api.sap.com/s4hanacloud",
    },
  },
});






export const sapBasicAuthConnection = connection({
  key: "sapBasicAuth",
  display: {
    label: "Basic Auth",
    description:
      "Basic Authentication connection for direct access to SAP S/4HANA Cloud Public Edition. Requires a Communication User configured in SAP.",
  },
  inputs: {
    tenantUrl: {
      label: "Tenant URL",
      placeholder: "https://my123456-api.s4hana.cloud.sap",
      type: "string",
      required: true,
      shown: true,
      comments: "SAP S/4HANA Cloud API tenant URL (include -api in the hostname).",
      example: "https://my123456-api.s4hana.cloud.sap",
    },
    username: {
      label: "Communication User",
      placeholder: "Username",
      type: "string",
      required: true,
      shown: true,
      comments: "Communication User name from the Communication Arrangement in SAP S/4HANA Cloud.",
      example: "COMM_USER_001",
    },
    password: {
      label: "Password",
      placeholder: "Password",
      type: "password",
      required: true,
      shown: true,
      comments: "Communication User password.",
    },
  },
});








export const sapOAuthConnection = oauth2Connection({
  key: "sapOAuth",
  display: {
    label: "OAuth 2.0 Authorization Code",
    description:
      "Authenticate with an SAP S/4HANA Cloud Public Edition tenant using OAuth 2.0 Authorization Code flow. Provides full read/write access to business data.",
  },
  oauth2Type: OAuth2Type.AuthorizationCode,
  oauth2PkceMethod: OAuth2PkceMethod.S256,
  inputs: templateConnectionInputs(
    {
      tenantId: {
        label: "Tenant ID",
        placeholder: "my123456",
        example: "my123456",
        type: "string",
        required: true,
        shown: true,
        comments:
          "The SAP S/4HANA Cloud tenant identifier. This is the prefix in your SAP URL (e.g., 'my123456' from my123456.s4hana.cloud.sap). [Learn more](https://help.sap.com/docs/SAP_S4HANA_CLOUD/0f69f8fb28ac4bf48d2b57b9637e81fa/2e84a10c430645a88bdbfaaa23ac9ff7.html)",
      },
      clientId: {
        label: "Client ID",
        placeholder: "Enter Client ID",
        example: "TEST",
        type: "string",
        required: true,
        shown: true,
        comments:
          "The OAuth Client ID from the Communication Arrangement. Navigate to Inbound Communication and click OAuth 2.0 Details to view the Client ID. [Learn more](https://help.sap.com/docs/SAP_S4HANA_CLOUD/0f69f8fb28ac4bf48d2b57b9637e81fa/2e84a10c430645a88bdbfaaa23ac9ff7.html)",
      },
      clientSecret: {
        label: "Client Secret",
        placeholder: "Enter Client Secret",
        type: "password",
        required: false,
        shown: false,
        default: "",
        comments: "Leave empty for Public Client configurations.",
      },
      scopes: {
        label: "Scopes",
        placeholder: "Enter scopes",
        example: "API_PURCHASEORDER_PROCESS_SRV_0001",
        type: "string",
        required: false,
        shown: true,
        default: "",
        comments:
          "Space-separated OAuth scopes. Leave empty to use default scopes, or specify API scopes from your Communication Arrangement.",
      },
    },
    {
      authorizeUrl: {
        label: "Authorize URL",
        placeholder: "Enter Authorize URL",
        example: "https://my410414.s4hana.cloud.sap/sap/bc/sec/oauth2/authorize",
        type: "template",
        required: true,
        shown: false,
        comments: "The OAuth 2.0 authorization endpoint for SAP S/4HANA.",
        templateValue: "https://{{#tenantId}}.s4hana.cloud.sap/sap/bc/sec/oauth2/authorize",
      },
      tokenUrl: {
        label: "Token URL",
        placeholder: "Enter Token URL",
        example:
          "https://my123456-api.s4hana.cloud.sap/sap/public/bc/sec/oauth2/token?client_id=TEST",
        type: "template",
        required: true,
        shown: false,
        comments: "The OAuth 2.0 token endpoint for SAP S/4HANA.",
        templateValue:
          "https://{{#tenantId}}-api.s4hana.cloud.sap/sap/public/bc/sec/oauth2/token?client_id={{#clientId}}",
      },
    },
    OAuth2Type.AuthorizationCode,
  ),
});

export default [sapOAuthConnection, sapBasicAuthConnection, sapApiKeyConnection];

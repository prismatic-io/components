import {
  input,
  OAuth2Type,
  oauth2Connection,
  util,
} from "@prismatic-io/spectral";
import { spAPIEndpoints } from "./inputs";

export const amazonOauth = oauth2Connection({
  oauth2Type: OAuth2Type.AuthorizationCode,
  key: "oauth2",
  display: {
    label: "OAuth 2.0",
    description: "OAuth 2.0 connection for Amazon Seller Central",
  },
  comments:
    "Authenticate requests to Amazon Seller Central using values obtained from the developer console.",
  inputs: {
    authorizeUrl: {
      label: "Authorize URL",
      placeholder: "Enter Authorize URL",
      type: "string",
      required: true,
      shown: true,
      comments:
        "The OAuth 2.0 Authorization URL for Amazon Seller Central. For the {Seller Central URL} use one of the [Seller Central URLs](https://developer-docs.amazon.com/sp-api/docs/seller-central-urls). Replace {YOUR_APPLICATION_ID} with the application ID you received from the Developer Central page. If your app is still not in production, add the version=beta parameter to the URL.",
      default:
        "{Seller Central URL}/apps/authorize/consent?application_id={YOUR_APPLICATION_ID}",
    },
    tokenUrl: {
      label: "Token URL",
      placeholder: "Enter Token URL",
      type: "string",
      required: true,
      shown: false,
      comments: "The OAuth 2.0 Token URL for Amazon Seller Central.",
      default: "https://api.amazon.com/auth/o2/token",
    },
    scopes: {
      label: "Scopes",
      placeholder: "Enter scopes",
      type: "string",
      required: false,
      shown: false,
      comments:
        "Space-delimited set of one or more scopes to get the user's permission to access.",
    },
    clientId: {
      label: "Client ID",
      placeholder: "Enter Client ID",
      type: "string",
      required: true,
      shown: true,
      comments:
        "Client ID from your Amazon Seller Central application. Find this on the [Developer Central](https://developer-docs.amazon.com/sp-api/docs/registering-your-application) page.",
      example: "amzn1.application-oa2-client.1234567890abcdef",
    },
    clientSecret: {
      label: "Client Secret",
      placeholder: "Enter Client Secret",
      type: "password",
      required: true,
      shown: true,
      comments:
        "Client Secret from your Amazon Seller Central application. Find this on the [Developer Central](https://developer-docs.amazon.com/sp-api/docs/registering-your-application) page.",
    },
    region: spAPIEndpoints,
    isSandboxEnvironment: input({
      label: "Is Sandbox Environment",
      type: "string",
      required: false,
      shown: true,
      comments:
        "When set to Yes, the connection will use the Amazon SP-API sandbox environment for testing. Leave blank or select No for production use.",
      model: [
        {
          label: "Yes",
          value: "true",
        },
        {
          label: "No",
          value: "false",
        },
        {
          label: "",
          value: "",
        },
      ],
      clean: util.types.toString,
    }),
  },
});

export const amazonClientCredentials = oauth2Connection({
  oauth2Type: OAuth2Type.ClientCredentials,
  key: "clientCredentials",
  display: {
    label: "OAuth 2.0 Client Credentials",
    description:
      "OAuth 2.0 Client Credentials connection for Amazon Seller Central",
  },
  comments:
    "Authenticate requests to Amazon Seller Central using OAuth 2.0 Client Credentials flow. Use this for server-to-server integrations.",
  inputs: {
    authorizeUrl: {
      label: "Authorize URL",
      placeholder: "Enter Authorize URL",
      type: "string",
      required: true,
      shown: true,
      comments:
        "The OAuth 2.0 Authorization URL for Amazon Seller Central. For the {Seller Central URL} use one of the [Seller Central URLs](https://developer-docs.amazon.com/sp-api/docs/seller-central-urls). Replace {YOUR_APPLICATION_ID} with the application ID you received from the Developer Central page. If your app is still not in production, add the version=beta parameter to the URL.",
      default:
        "{Seller Central URL}/apps/authorize/consent?application_id={YOUR_APPLICATION_ID}",
    },
    tokenUrl: {
      label: "Token URL",
      placeholder: "Enter Token URL",
      type: "string",
      required: true,
      shown: false,
      comments: "The OAuth 2.0 Token URL for Amazon Seller Central.",
      default: "https://api.amazon.com/auth/o2/token",
    },
    scopes: {
      label: "Scopes",
      placeholder: "Enter scopes",
      type: "string",
      required: false,
      shown: true,
      comments:
        "Space-delimited set of one or more scopes to get the user's permission to access.",
      example: "sellingpartnerapi::migration",
    },
    clientId: {
      label: "Client ID",
      placeholder: "Enter Client ID",
      type: "string",
      required: true,
      shown: true,
      comments:
        "Client ID from your Amazon Seller Central application. Find this on the [Developer Central](https://developer-docs.amazon.com/sp-api/docs/registering-your-application) page.",
      example: "amzn1.application-oa2-client.1234567890abcdef",
    },
    clientSecret: {
      label: "Client Secret",
      placeholder: "Enter Client Secret",
      type: "password",
      required: true,
      shown: true,
      comments:
        "Client Secret from your Amazon Seller Central application. Find this on the [Developer Central](https://developer-docs.amazon.com/sp-api/docs/registering-your-application) page.",
    },
    region: spAPIEndpoints,
    isSandboxEnvironment: input({
      label: "Is Sandbox Environment",
      type: "string",
      required: false,
      shown: true,
      comments:
        "When set to Yes, the connection will use the Amazon SP-API sandbox environment for testing. Leave blank or select No for production use.",
      model: [
        {
          label: "Yes",
          value: "true",
        },
        {
          label: "No",
          value: "false",
        },
        {
          label: "",
          value: "",
        },
      ],
      clean: util.types.toString,
    }),
  },
});

export default [amazonOauth, amazonClientCredentials];

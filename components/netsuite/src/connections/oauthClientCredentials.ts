import { connection } from "@prismatic-io/spectral";

export const oauthClientCredentials = connection({
  key: "oauthClientCredentials",
  display: {
    label: "NetSuite OAuth Client Credentials",
    description: "NetSuite OAuth 2.0 Client Credentials Connection",
  },
  inputs: {
    tokenUrl: {
      label: "Token URL",
      type: "string",
      required: true,
      shown: true,
      comments:
        "The OAuth 2.0 Token URL for NetSuite. Replace &lt;ACCOUNT_ID&gt; with your NetSuite account ID, which can be found in your browser's URL bar when you log in: https://&lt;ACCOUNT_ID&gt;.app.netsuite.com/",
      placeholder: "Enter token URL",
      default:
        "https://<ACCOUNT_ID>.suitetalk.api.netsuite.com/services/rest/auth/oauth2/v1/token",
    },
    scopes: {
      label: "Scopes",
      type: "string",
      required: true,
      shown: false,
      comments:
        "A space-delimited set of one or more scopes. This will always be rest_webservices",
      default: "rest_webservices",
    },
    keyId: {
      label: "Certificate ID (Key ID)",
      type: "string",
      required: true,
      shown: true,
      example: "a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0",
      placeholder: "Enter certificate ID (key ID)",
      comments:
        "The certificate ID (key ID) from your NetSuite certificate, used for signing the JWT token. Found in Setup > Company > Company Information > Certificates.",
    },
    privateKey: {
      label: "Private Key for JWT",
      type: "text",
      required: true,
      shown: true,
      placeholder: "Enter private key",
      comments:
        "The private key (RSA or EC format) used for signing the JWT token. This is the private key corresponding to your NetSuite certificate. Include the full key with BEGIN/END markers.",
    },
    clientId: {
      label: "Consumer Key (Client ID)",
      type: "string",
      required: true,
      shown: true,
      comments:
        "The consumer key generated when you create your OAuth 2.0 application in NetSuite. Navigate to Setup > Company > Enable Features > SuiteCloud > Manage Authentication to create an application.",
      example:
        "a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0u1v2w3x4y5z6a7b8c9d0e1f2",
      placeholder: "Enter consumer key (client ID)",
    },
  },
});

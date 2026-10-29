import {
  OAuth2PkceMethod,
  OAuth2Type,
  oauth2Connection,
} from "@prismatic-io/spectral";

export const oauth = oauth2Connection({
  key: "oauth",
  oauth2Type: OAuth2Type.AuthorizationCode,
  oauth2PkceMethod: OAuth2PkceMethod.S256,
  display: {
    label: "NetSuite OAuth Auth Code",
    description: "NetSuite OAuth 2.0 Connection",
  },
  inputs: {
    authorizeUrl: {
      label: "Authorize URL",
      type: "string",
      required: true,
      shown: false,
      comments: "The OAuth 2.0 Authorization URL for NetSuite.",
      default: "https://system.netsuite.com/app/login/oauth2/authorize.nl",
    },
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
    clientSecret: {
      label: "Consumer Secret (Client Secret)",
      type: "password",
      required: true,
      shown: true,
      comments:
        "The consumer secret generated when you create your OAuth 2.0 application in NetSuite. Navigate to Setup > Company > Enable Features > SuiteCloud > Manage Authentication to create an application.",
      example:
        "z9y8x7w6v5u4t3s2r1q0p9o8n7m6l5k4j3i2h1g0f9e8d7c6b5a4z3y2x1w0v9u8",
      placeholder: "Enter consumer secret (client secret)",
    },
  },
});

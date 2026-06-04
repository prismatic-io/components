import { connection } from "@prismatic-io/spectral";

export const adpOauth2 = connection({
  key: "adpOauth2",
  display: {
    label: "OAuth 2.0",
    description: "OAuth 2.0 connection for ADP Workforce Now",
  },
  inputs: {
    endpoint: {
      label: "API Endpoint",
      placeholder: "Enter API endpoint URL",
      type: "string",
      required: true,
      shown: true,
      comments: "The endpoint to use for the ADP Workforce Now API.",
      example: "https://api.adp.com/",
      default: "https://api.adp.com/",
    },
    tokenEndpoint: {
      label: "Token Endpoint",
      placeholder: "Enter token endpoint URL",
      type: "string",
      required: true,
      shown: true,
      comments: "The OAuth 2.0 token endpoint URL for ADP authentication.",
      example: "https://accounts.adp.com/auth/oauth/v2/token",
      default: "https://accounts.adp.com/auth/oauth/v2/token",
      
      
    },
    clientId: {
      label: "Client ID",
      placeholder: "Client ID",
      type: "string",
      required: true,
      shown: true,
      comments: "The client ID for the project in the ADP Developer Portal",
    },
    clientSecret: {
      label: "Client Secret",
      placeholder: "Client Secret",
      type: "password",
      required: true,
      shown: true,
      comments: "The client secret for the project in the ADP Developer Portal",
    },
    sslKey: {
      label: "Key File",
      placeholder: "Key File",
      comments: "The key file generated from the ADP Developer Portal",
      type: "text",
      required: true,
      shown: true,
    },
    sslCert: {
      label: "Certificate File",
      placeholder: "Certificate File",
      comments:
        "The certificate file (.pem) generated from the ADP Developer Portal",
      type: "text",
      required: true,
      shown: true,
    },
    subscriberOrganizationOID: {
      label: "Subscriber Organization OID",
      placeholder: "Enter Organization OID",
      comments:
        "The organization OID (OOID) of the subscribed client. Only specify this if using a client ID and client secret for an organization different from the one being queried.",
      example: "G3KSYTXAQH20T5ZS",
      type: "string",
      required: false,
      shown: true,
    },
  },
});

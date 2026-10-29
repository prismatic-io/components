import { connection } from "@prismatic-io/spectral";
import { apiServer, protocol } from "./inputs";

export const apiKeyAuthentication = connection({
  key: "sap-successfactors-api-key-authentication",
  display: {
    label: "API Key Authentication",
    description:
      "Authenticate using OAuth 2.0 with a SAML 2.0 Bearer assertion. Recommended authentication method for SAP SuccessFactors.",
  },
  inputs: {
    companyId: {
      label: "Company ID",
      placeholder: "Company ID",
      type: "string",
      required: true,
      shown: true,
      comments: "SAP SuccessFactors Company ID",
    },
    user: {
      label: "User",
      placeholder: "sfadmin",
      type: "string",
      required: true,
      shown: true,
      comments:
        "Enter the SAP SuccessFactors user ID that you use to access the APIs",
      example: "sfadmin",
    },
    apiKey: {
      label: "API Key",
      placeholder: "YzVjNzI4MTIsdryNmJkOTVkYWJmODBiZjdkYg",
      type: "password",
      required: true,
      shown: true,
      comments: "Your OAuth2 Success Factors API Key",
      example: "YzVjNzI4MTIsdryNmJkOTVkYWJmODBiZjdkYg",
    },
    issuer: {
      label: "Issuer",
      placeholder: "wwww.successfactors.com",
      type: "string",
      required: true,
      shown: true,
      comments: "Issuer information of the SAML assertion",
      example: "wwww.successfactors.com",
    },
    privateKey: {
      label: "Certificate Private Key",
      placeholder: "Certificate Private Key",
      type: "text",
      required: true,
      shown: true,
      comments: "Your Private Certificate Key for Success Factors OAuth2",
    },
    cert: {
      label: "Certificate",
      placeholder: "Certificate",
      type: "text",
      required: true,
      shown: true,
      comments: "Your Public Certificate for Success Factors OAuth2",
    },
    audiences: {
      label: "Audiences",
      placeholder: "www.successfactors.com",
      type: "string",
      required: true,
      shown: true,
      comments: "Audiences of the SAML assertion",
      example: "www.successfactors.com",
    },
    apiServer,
    protocol,
  },
});

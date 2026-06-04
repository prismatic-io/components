import { connection, input } from "@prismatic-io/spectral";
import { AVAILABLE_PROTOCOLS } from "./constants";

export const apiServer = input({
  label: "API Server",
  placeholder: "testing.successfactors.com",
  type: "string",
  required: false,
  shown: true,
  comments:
    "Your SAP SuccessFactors api server, if you are not sure, please contact your SAP SuccessFactors administrator. If empty the sandbox environment will be used (sandbox.api.sap.com)",
  example: "testing.successfactors.com",
});

export const protocol = input({
  label: "Protocol",
  placeholder: "Protocol",
  type: "string",
  required: true,
  shown: true,
  comments: "The SAP SuccessFactors protocol to use",
  model: AVAILABLE_PROTOCOLS,
});

export const basicAuthentication = connection({
  key: "sap-successfactors-basic-authentication",
  display: {
    label: "Basic Authentication",
    description: "Basic Authentication for SAP SuccessFactors Connection",
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
    username: {
      label: "Username",
      placeholder: "Username",
      type: "string",
      required: true,
      shown: true,
      comments: "SAP SuccessFactors Username",
    },
    password: {
      label: "Password",
      placeholder: "Password",
      type: "password",
      required: true,
      shown: true,
      comments: "SAP SuccessFactors Password",
    },
    protocol,
    apiServer,
  },
});

export const apiKeyAuthentication = connection({
  key: "sap-successfactors-api-key-authentication",
  display: {
    label: "API Key Authentication",
    description: "API Key Authentication for SAP SuccessFactors Connection",
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
      comments: "Enter the SAP SuccessFactors user ID that you use to access the APIs",
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

export default [apiKeyAuthentication, basicAuthentication];

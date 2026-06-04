import { connection } from "@prismatic-io/spectral";







export const ukgProBasicAuth = connection({
  key: "ukgProBasicAuth",
  display: {
    label: "Basic Authentication",
    description: "Authenticate using username and password",
  },
  comments:
    "Use this connection for Personnel API (employee data, demographics, changes) and Configuration API (positions, jobs, locations). Create service accounts in System Configuration > Security > Service Account Administration.",
  inputs: {
    baseUrl: {
      label: "API Base URL",
      placeholder: "Enter API base URL",
      type: "string",
      required: true,
      shown: true,
      comments:
        "The base URL for the UKG Pro API environment. Common values: https://service5.ultipro.com (US), https://service4.ultipro.ca (Canada). See [Environment Configuration](https://developer.ukg.com/hcm/docs/web-service-account#service-endpoints) for details.",
      example: "https://service5.ultipro.com",
    },
    customerApiKey: {
      label: "Customer API Key",
      placeholder: "Enter customer API key",
      type: "password",
      required: true,
      shown: true,
      comments:
        "The UKG Pro Customer API Key. Found in <strong>System Configuration > Security > Web Service Accounts</strong>. See [Authentication Overview](https://developer.ukg.com/hcm/docs/web-service-account#service-endpoints) for details.",
      example: "3SKPV",
    },
    username: {
      label: "Service Account Username",
      placeholder: "Enter service account username",
      type: "string",
      required: true,
      shown: true,
      comments: "The username for the Web Service Account configured in UKG Pro.",
      example: "api_service_account",
    },
    password: {
      label: "Service Account Password",
      placeholder: "Enter service account password",
      type: "password",
      required: true,
      shown: true,
      comments: "The password for the Web Service Account.",
    },
  },
});


































































export default [ukgProBasicAuth];

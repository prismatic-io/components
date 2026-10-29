import { connection, input } from "@prismatic-io/spectral";

export const jamfClientCredentials = connection({
  key: "jamfClientCredentials",
  display: {
    label: "OAuth 2.0 Client Credentials",
    description: "Authenticate using OAuth 2.0 client credentials.",
  },
  inputs: {
    baseUrl: input({
      label: "Jamf Pro URL",
      type: "string",
      required: true,
      shown: true,
      comments:
        "The base URL of the Jamf Pro instance (e.g., https://acme.jamfcloud.com).",
      placeholder: "Enter Jamf Pro URL (e.g., https://acme.jamfcloud.com)",
      example: "https://acme.jamfcloud.com",
    }),
    clientId: input({
      label: "Client ID",
      type: "string",
      required: true,
      shown: true,
      comments:
        "The API Client ID from Settings > API Roles and Clients in Jamf Pro.",
      placeholder: "Enter API Client ID",
      example: "abc12345-1234-1234-1234-abc1234567890",
    }),
    clientSecret: input({
      label: "Client Secret",
      type: "password",
      required: true,
      shown: true,
      comments:
        "The API Client Secret from Settings > API Roles and Clients in Jamf Pro.",
    }),
  },
});

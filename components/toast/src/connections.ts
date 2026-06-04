import { connection } from "@prismatic-io/spectral";

export const toastClientCredentials = connection({
  key: "toastClientCredentials",
  display: {
    label: "Toast Client Credentials",
    description: "Connection for Toast Client Credentials",
  },
  inputs: {
    clientId: {
      label: "Client ID",
      comments: "Client ID for Toast.",
      type: "string",
      required: true,
    },
    clientSecret: {
      label: "Client Secret",
      comments: "Client Secret for Toast.",
      type: "password",
      required: true,
    },
    apiUrl: {
      label: "API URL",
      comments: "Your API URL for Toast.",
      type: "string",
      required: true,
      example: "https://toast-api-server.com",
      placeholder: "https://toast-api-server.com",
    },
  },
});

export default [toastClientCredentials];

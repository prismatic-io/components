import { connection } from "@prismatic-io/spectral";

export const asposeConnection = connection({
  key: "apiKey",
  display: {
    label: "Aspose API Key",
    description: "Authenticate with Aspose using Client ID and Client Secret.",
  },
  inputs: {
    clientId: {
      label: "Application Client ID",
      type: "string",
      required: true,
      placeholder: "Enter Client ID",
      example: "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
      comments: "Client ID of your Aspose Application.",
    },
    clientSecret: {
      label: "Application Client Secret",
      type: "password",
      required: true,
      placeholder: "Enter Client Secret",
      comments: "Client Secret of your Aspose Application.",
    },
    baseUrl: {
      label: "Aspose API Base URL",
      type: "string",
      default: "https://api.aspose.cloud",
      required: true,
      shown: false,
      comments: "Base URL for the Aspose API.",
    },
  },
});

export default [asposeConnection];

import { connection } from "@prismatic-io/spectral";

export const deepseekApiKeyConnection = connection({
  key: "api-key",
  display: {
    label: "API Key",
    description:
      "The DeepSeek API Key to use in order to authenticate with the DeepSeek API.",
  },
  inputs: {
    baseUrl: {
      label: "Base URL",
      type: "string",
      comments: "The base URL of the DeepSeek API.",
      default: "https://api.deepseek.com",
      shown: false,
      required: true,
    },
    apiKey: {
      label: "API Key",
      type: "string",
      comments: "DeepSeek API Key.",
      example: "ASDB1234567890",
      placeholder: "Enter a DeepSeek API Key.",
      shown: true,
      required: true,
    },
  },
});

export default [deepseekApiKeyConnection];

import { connection } from "@prismatic-io/spectral";

export const apiKeySecret = connection({
  key: "apiKey",
  display: {
    description: "Authenticate requests to New Relic using an API key.",
    label: "API Key",
  },
  inputs: {
    apiKey: {
      label: "API Key",
      placeholder: "API Key",
      type: "string",
      required: true,
      shown: true,
      comments: "Provide the API key from the developer console.",
      example: "example187843230995241",
    },
  },
});

export default [apiKeySecret];

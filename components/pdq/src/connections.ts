import { connection } from "@prismatic-io/spectral";

export const pdqConnection = connection({
  key: "pdq-api-key",
  display: {
    label: "API Key",
    description: "Connection to the PDQ API",
  },
  inputs: {
    apiKey: {
      label: "API Key",
      placeholder: "Enter API key",
      type: "string",
      required: true,
      comments: "The PDQ API Key",
    },
  },
});

export default [pdqConnection];

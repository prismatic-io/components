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
      placeholder: "Enter API key",
      type: "string",
      required: true,
      shown: true,
      comments: "Provide the API key from the developer console.",
      example: "example187843230995241",
    },
    region: {
      label: "Region",
      type: "string",
      required: true,
      shown: true,
      default: "US",
      comments: "Select the New Relic data center region for the account.",
      model: [
        { label: "US", value: "US" },
        { label: "EU", value: "EU" },
      ],
    },
  },
});

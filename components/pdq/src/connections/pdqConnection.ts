import { connection } from "@prismatic-io/spectral";
export const pdqConnection = connection({
  key: "pdq-api-key",
  display: {
    label: "API Key",
    description: "Authenticate requests using an API key",
  },
  inputs: {
    apiKey: {
      label: "API Key",
      placeholder: "Enter API key",
      type: "password",
      required: true,
      shown: true,
      comments:
        "The API key generated from the PDQ Connect settings page. See [PDQ Connect API](https://connect.pdq.com/hc/en-us/articles/22929727991451-PDQ-Connect-API).",
      example: "pdq_a1b2c3d4e5f67890a1b2c3d4e5f67890",
    },
  },
});

import { connection } from "@prismatic-io/spectral";
export const klaviyoApiKeyConnection = connection({
  key: "klaviyoApiKeyConnection",
  display: {
    label: "API Key",
    description: "Authenticate using an API key.",
  },
  inputs: {
    apiKey: {
      label: "API Key",
      type: "password",
      required: true,
      comments: "API key for Klaviyo.",
    },
  },
});

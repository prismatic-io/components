import { connection } from "@prismatic-io/spectral";
export const apiKey = connection({
  key: "apiKey",
  display: {
    label: "API Key",
    description: "Authenticate requests using an API key.",
  },
  inputs: {
    apiKey: {
      label: "API Key",
      placeholder: "Enter API Key",
      type: "string",
      required: true,
      shown: true,
      comments:
        "The Monday.com API key used for authentication. Generate one from the Monday.com account settings.",
    },
  },
});

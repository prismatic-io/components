import { connection } from "@prismatic-io/spectral";
export const asanaApiKeyConnection = connection({
  key: "apiKey",
  display: {
    label: "Personal Access Token",
    description: "Authenticate requests using an Asana Personal Access Token.",
  },
  inputs: {
    apiKey: {
      label: "Personal Access Token",
      placeholder: "Enter Personal Access Token",
      type: "password",
      required: true,
      shown: true,
      comments:
        "The Asana Personal Access Token. Generate one from the [Asana Developer Portal](https://app.asana.com/0/my-apps).",
      example: "1/example",
    },
  },
});

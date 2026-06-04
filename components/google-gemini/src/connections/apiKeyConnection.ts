import { connection } from "@prismatic-io/spectral";

export const apiKeyConnection = connection({
  key: "apiKeyConnection",
  display: {
    label: "API Key",
    description: "Authenticate requests to Google Gemini using an API key.",
  },
  inputs: {
    apiKey: {
      label: "API Key",
      placeholder: "Enter API key",
      type: "password",
      required: true,
      shown: true,
      comments:
        "The Google AI Studio API key for authentication. Generate API keys [here](https://aistudio.google.com/app/apikey).",
      example: "AIza...",
    },
  },
});

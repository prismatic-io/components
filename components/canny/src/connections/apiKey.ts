import { connection } from "@prismatic-io/spectral";

export const cannyApiKey = connection({
  key: "cannyApiKey",
  display: {
    label: "API Key",
    description: "Authenticate using a Canny API key.",
  },
  inputs: {
    apiKey: {
      label: "API Key",
      type: "password",
      required: true,
      shown: true,
      comments:
        "The Canny API key. Generate one at Settings > API in the Canny admin panel.",
    },
  },
});

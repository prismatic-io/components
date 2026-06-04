import { connection } from "@prismatic-io/spectral";

const anthropicConnection = connection({
  key: "anthropic",
  display: {
    label: "Anthropic API",
    description: "Connection to Anthropic's Claude API",
  },
  inputs: {
    apiKey: {
      label: "API Key",
      type: "password",
      required: true,
      comments: "Your Anthropic API key.",
      shown: true,
    },
  },
});

export default [anthropicConnection];

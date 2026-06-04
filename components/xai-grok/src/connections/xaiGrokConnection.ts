import { connection } from "@prismatic-io/spectral";

export const xaiGrokConnection = connection({
  key: "xaiGrokConnection",
  display: {
    label: "xAI Grok",
    description: "Connection to xAI Grok API using API key authentication",
  },
  inputs: {
    token: {
      label: "API Key",
      type: "password",
      required: true,
      shown: true,
      comments: "Your xAI Grok API key.",
      example: "xai-XqaU...",
      placeholder: "xai-XqaU...",
    },
  },
});

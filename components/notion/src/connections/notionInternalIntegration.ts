import { connection } from "@prismatic-io/spectral";
export const notionInternalIntegration = connection({
  key: "notionInternalIntegration",
  display: {
    label: "Internal Integration Secret",
    description: "Connect to Notion using an Internal Integration Secret",
  },
  inputs: {
    apiKey: {
      label: "Internal Integration Secret",
      placeholder: "Enter Internal Integration Secret",
      type: "password",
      required: true,
      shown: true,
      comments:
        "The Notion Internal Integration Secret. Create an integration in the [Notion integrations settings](https://app.notion.com/developers/connections) to obtain this token.",
      example: "secret_a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0u1v2w3",
    },
  },
});

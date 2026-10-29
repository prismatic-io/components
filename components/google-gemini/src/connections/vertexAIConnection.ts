import { connection } from "@prismatic-io/spectral";

export const vertexAIConnection = connection({
  key: "vertexAIConnection",
  display: {
    label: "Service Account",
    description:
      "Authenticate requests to Google Gemini via Vertex AI using a service account.",
  },
  inputs: {
    projectId: {
      label: "Project ID",
      type: "string",
      required: true,
      shown: true,
      comments:
        "The Google Cloud project ID associated with the Vertex AI API.",
      example: "my-project-123",
      placeholder: "Enter project ID",
    },
    region: {
      label: "Region",
      type: "string",
      required: true,
      shown: true,
      comments:
        "The region to use for API requests. See [available regions](https://docs.cloud.google.com/vertex-ai/generative-ai/docs/learn/locations).",
      example: "us-central1",
      placeholder: "Enter region",
    },
    clientEmail: {
      label: "Client Email",
      placeholder: "Enter client email",
      type: "string",
      required: true,
      shown: true,
      comments:
        "The service account email address used to authenticate with Google Cloud.",
    },
    privateKey: {
      label: "Private Key",
      placeholder: "Enter private key",
      type: "password",
      required: true,
      shown: true,
      comments:
        "The private key from the service account credentials used for authentication.",
    },
  },
});

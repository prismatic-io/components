import { connection } from "@prismatic-io/spectral";

















































export const freshserviceApiKeyConnection = connection({
  key: "freshservice-api-key-connection",
  display: {
    label: "API Key",
    description: "Authenticate requests using an API key.",
  },
  inputs: {
    freshserviceDomain: {
      label: "Freshservice Domain",
      comments:
        "The domain name of the Freshservice account. For example, if the Freshservice URL is https://example.freshservice.com, enter example.",
      type: "string",
      required: true,
    },
    apiKey: {
      label: "API Key",
      comments: "The Freshservice API key for authentication.",
      type: "password",
      required: true,
    },
  },
});

export default [freshserviceApiKeyConnection];

import { connection } from "@prismatic-io/spectral";

export const algoliaApiKey = connection({
  key: "apiKey",
  display: {
    label: "API Key",
    description: "API Key connection for Algolia",
  },
  inputs: {
    apiKey: {
      label: "API Key",
      placeholder: "API Key",
      type: "string",
      required: true,
      shown: true,
      comments: "Your Algolia API Key",
      example: "YourAlgoliaAPIKey",
    },
    applicationId: {
      label: "Application ID",
      placeholder: "Application ID",
      type: "string",
      required: true,
      shown: true,
      comments: "Your Algolia Application ID",
      example: "YourAlgoliaApplicationId",
    },
  },
});

export default [algoliaApiKey];

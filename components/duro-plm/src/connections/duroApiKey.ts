import { connection } from "@prismatic-io/spectral";

export const duroApiKey = connection({
  key: "duroApiKey",
  display: {
    label: "API Key",
    description: "Authenticate requests using an API key.",
  },
  inputs: {
    username: {
      label: "API Key",
      placeholder: "Enter Duro API Key",
      type: "password",
      required: true,
      shown: true,
      comments:
        "The API key for the Duro account. Generate an API key in Duro account settings under the Integrations tab.",
      example:
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIn0",
    },
    duroEnvironment: {
      label: "Duro Environment",
      placeholder: "Select Duro Environment",
      type: "string",
      required: true,
      shown: true,
      comments:
        "The Duro GraphQL endpoint. Select based on data residency requirements: Main (MFG) for standard accounts, ITAR for US government compliance, or EU for European data residency.",
      example: "https://mfg.duro.app/graphql",
      model: [
        {
          label: "Main (MFG)",
          value: "https://mfg.duro.app/graphql",
        },
        {
          label: "ITAR",
          value: "https://gov.duro.us/graphql",
        },
        {
          label: "EU",
          value: "https://eu.duro.app/graphql",
        },
      ],
    },
    customDuroEnvironment: {
      label: "Custom Duro Environment",
      placeholder: "Enter custom GraphQL endpoint URL",
      type: "string",
      required: false,
      shown: true,
      comments:
        "If provided, this will override the selected Duro Environment. Use for private Duro instances or custom deployments.",
      example: "https://custom-instance.duro.app/graphql",
    },
  },
});

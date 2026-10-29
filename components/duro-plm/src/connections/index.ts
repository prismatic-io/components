import { connection } from "@prismatic-io/spectral";

const duroApiKey = connection({
  key: "duroApiKey",
  display: {
    label: "API Key",
    description: "Authenticate requests using an API key.",
  },
  inputs: {
    username: {
      label: "API Key",
      placeholder: "Enter Duro API Key",
      example:
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIn0",
      comments:
        "The API key for the Duro account. Generate an API key in Duro account settings under the Integrations tab.",
      type: "password",
      required: true,
    },
    duroEnvironment: {
      label: "Duro Environment",
      placeholder: "Select Duro Environment",
      comments:
        "The Duro GraphQL endpoint. Select based on data residency requirements: Main (MFG) for standard accounts, ITAR for US government compliance, or EU for European data residency.",
      type: "string",
      required: true,
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
      example: "https://mfg.duro.app/graphql",
    },
    customDuroEnvironment: {
      label: "Custom Duro Environment",
      type: "string",
      required: false,
      placeholder: "Enter custom GraphQL endpoint URL",
      comments:
        "If provided, this will override the selected Duro Environment. Use for private Duro instances or custom deployments.",
      example: "https://custom-instance.duro.app/graphql",
    },
  },
});

export default [duroApiKey];

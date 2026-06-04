import { connection } from "@prismatic-io/spectral";

export const jsmOpsGenieKey = connection({
  key: "jsmOpsGenieKey",
  display: {
    label: "Ops Integration API Key",
    description:
      "Authenticate with the JSM Ops Integration Events API using a GenieKey integration API key.",
  },
  inputs: {
    apiKey: {
      label: "API Key",
      type: "password",
      required: true,
      shown: true,
      comments:
        "GenieKey API key generated from a JSM Ops API integration. Find this under Operations > Integrations in your JSM project.",
      example: "eb243592-faa2-4ba2-a551-1afdf565c889",
    },
  },
});

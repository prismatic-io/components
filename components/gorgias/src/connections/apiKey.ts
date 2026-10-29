import { connection } from "@prismatic-io/spectral";
import { apiKeyInputs } from "../inputs/connections";

export const apiKey = connection({
  key: "gorgias-api-key",
  display: {
    label: "Gorgias API Key",
    description: "Connection to Gorgias using an API Key.",
  },
  inputs: apiKeyInputs,
});

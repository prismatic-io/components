import { inputs as httpClientInputs } from "@prismatic-io/spectral/dist/clients/http";
import { connection } from "./common";

const { debugRequest: _, ...httpClientInputsWithoutDebug } = httpClientInputs;

export const rawRequestInputs: {
  connection: typeof connection;
} & Omit<typeof httpClientInputs, "debugRequest"> = {
  connection,
  ...httpClientInputsWithoutDebug,
  url: {
    ...httpClientInputsWithoutDebug.url,
    comments:
      "The request path only (for example, /Candidate). The base API server URL is already included, so to reach <API_SERVER_URL>/Candidate, enter only /Candidate in this field.",
    example: "/Candidate",
  },
};

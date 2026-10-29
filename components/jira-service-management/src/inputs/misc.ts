import { inputs as httpClientInputs } from "@prismatic-io/spectral/dist/clients/http";
import { connection } from "./common";

const { debugRequest: _, ...destructuredInputs } = httpClientInputs;

export const rawRequestInputs = {
  connection,
  ...destructuredInputs,
  url: {
    ...destructuredInputs.url,
    comments:
      "Input the path only (e.g., /servicedesk). The base URL is resolved from the connection automatically.",
    example: "/servicedesk",
  },
};

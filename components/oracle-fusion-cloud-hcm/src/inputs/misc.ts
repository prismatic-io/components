import { inputs as httpClientInputs } from "@prismatic-io/spectral/dist/clients/http";
import { connection } from "./common";
const { debugRequest: _debugRequest, ...httpInputs } = httpClientInputs;
export const rawRequestInputs = {
  connection,
  ...httpInputs,
  url: {
    ...httpInputs.url,
    comments:
      "Input the path only (e.g., /publicWorkers). The base URL (https://{serverUrl}/hcmRestApi/resources/11.13.18.05) is already included.",
    example: "/publicWorkers",
  },
};

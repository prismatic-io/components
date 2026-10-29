import { inputs as httpClientInputs } from "@prismatic-io/spectral/dist/clients/http";
import { connection } from "./common";

const { debugRequest: _, ...noDebugRawRequestInputs } = httpClientInputs;

export const rawRequestInputs = {
  ...noDebugRawRequestInputs,
  url: {
    ...noDebugRawRequestInputs.url,
    comments:
      "Input the path only (/hr/v2/workers). The base URL is already included (https://api.adp.com/). For example, to connect to https://api.adp.com/hr/v2/workers, only /hr/v2/workers is entered in this field.",
    example: "/hr/v2/workers",
    placeholder: "/hr/v2/workers",
  },

  connection,
};

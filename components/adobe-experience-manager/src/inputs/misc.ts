import { inputs as httpClientInputs } from "@prismatic-io/spectral/dist/clients/http";
import { connection } from "./common";

const { debugRequest: _debugRequest, ...httpInputs } = httpClientInputs;

export const rawRequestInputs = {
  connection,
  ...httpInputs,
  url: {
    ...httpInputs.url,
    comments:
      "Input the path only (for example, /adobe/sites/cf/fragments). The AEM author host is already included.",
    example: "/adobe/sites/cf/fragments",
  },
};

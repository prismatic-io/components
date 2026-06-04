import { inputs as httpClientInputs } from "@prismatic-io/spectral/dist/clients/http";
import { squareConnection } from "./common";

const { debugRequest, ...httpInputsWithoutDebug } = httpClientInputs;

export const rawRequestInputs = {
  ...httpInputsWithoutDebug,
  squareConnection,
  url: {
    ...httpClientInputs.url,
    example: "/v2/locations",
  },
};

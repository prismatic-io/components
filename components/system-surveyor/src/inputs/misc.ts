import { inputs as httpClientInputs } from "@prismatic-io/spectral/dist/clients/http";
import { BASE_PRODUCTION_URL } from "../constants";
import { connectionInput } from "./common";

const { debugRequest: _, ...rawRequestInputs } = httpClientInputs;

export const healthCheckInputs = {
  ssvConnection: connectionInput,
};

export const rawRequestActionInputs = {
  connection: connectionInput,
  ...rawRequestInputs,
  url: {
    ...rawRequestInputs.url,
    comments: `Input the path only (/v3/sites). For example, to access the sites endpoint (${BASE_PRODUCTION_URL}/v3/sites), enter /v3/sites.`,
    example: "/v3/sites",
  },
};

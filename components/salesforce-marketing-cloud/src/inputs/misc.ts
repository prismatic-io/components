import { inputs as httpClientInputs } from "@prismatic-io/spectral/dist/clients/http";
import { JOURNEYS_PATH } from "../constants";
import { connection } from "./common";

const { debugRequest: _, ...noDebugHttpClientInputs } = httpClientInputs;

export const rawRequestInputs = {
  connection,
  ...noDebugHttpClientInputs,
  url: {
    ...noDebugHttpClientInputs.url,
    comments: `Input the path only (${JOURNEYS_PATH}). The base URL is already included (https://{your_subdomain}.rest.marketingcloudapis.com/). For example, to connect to https://{your_subdomain}.rest.marketingcloudapis.com/${JOURNEYS_PATH}, only ${JOURNEYS_PATH} is entered in this field.`,
    example: JOURNEYS_PATH,
  },
};

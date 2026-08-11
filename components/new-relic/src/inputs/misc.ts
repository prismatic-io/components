import { util } from "@prismatic-io/spectral";
import { inputs as httpClientInputs } from "@prismatic-io/spectral/dist/clients/http";
import { BASE_URLS } from "../constants";
import { connectionInput } from "./common";
const { debugRequest: _, ...rawHttpInputs } = httpClientInputs;
export const rawRequestInputs = {
  connection: connectionInput,
  baseUrl: {
    label: "Base URL",
    type: "string" as const,
    required: true,
    default: BASE_URLS.API.US,
    comments: "The base URL for the New Relic API.",
    placeholder: "Enter base URL",
    clean: util.types.toString,
  },
  ...rawHttpInputs,
  url: {
    ...rawHttpInputs.url,
    comments: `Input the path only (/labels.json). The base URL is already included (${BASE_URLS.API.US}). For example, to connect to ${BASE_URLS.API.US}/labels.json, only /labels.json is entered in this field.`,
    example: "/labels.json",
  },
};

import { inputs } from "@prismatic-io/spectral/dist/clients/http";
import { BASE_URL, DEFAULT_RAW_REQUEST_URL } from "../constants";
import { connectionInput } from "./general";

const { debugRequest: _, ...httpClientInputs } = inputs;

export const rawRequestInputs = {
  connection: connectionInput,
  ...httpClientInputs,
  url: {
    ...httpClientInputs.url,
    comments: `Input the path only (${DEFAULT_RAW_REQUEST_URL}), The base URL is already included (${BASE_URL}). For example, to connect to ${BASE_URL}${DEFAULT_RAW_REQUEST_URL}, only ${DEFAULT_RAW_REQUEST_URL} is entered in this field.`,
    example: DEFAULT_RAW_REQUEST_URL,
    default: DEFAULT_RAW_REQUEST_URL,
  },
};

import { inputs as httpClientInputs } from "@prismatic-io/spectral/dist/clients/http";
import { API_BASE_URL } from "../constants";
import { connection } from "./common";

const { debugRequest, ...httpInputsWithoutDebug } = httpClientInputs;

export const rawRequestInputs = {
  connection,
  ...httpInputsWithoutDebug,
  url: {
    ...httpClientInputs.url,
    comments: `Input the path only (/spaces), The base URL is already included (${API_BASE_URL}). For example, to connect to ${API_BASE_URL}/spaces, only /spaces is entered in this field.`,
    example: "/spaces",
    placeholder: "/spaces",
  },
};

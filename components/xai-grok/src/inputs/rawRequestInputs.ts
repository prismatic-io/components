import { inputs as httpClientInputs } from "@prismatic-io/spectral/dist/clients/http";
import { API_BASE_URL } from "../constants";
import { connection } from "./generalInputs";

const { debugRequest: _, ...destructuredInputs } = httpClientInputs;

export const rawRequestInputs = {
  connection,
  ...destructuredInputs,
  url: {
    ...destructuredInputs.url,
    comments: `Input the path only (/models), The base URL is already included (${API_BASE_URL}). For example, to connect to ${API_BASE_URL}/models, only /models is entered in this field.`,
    example: "/models",
  },
};

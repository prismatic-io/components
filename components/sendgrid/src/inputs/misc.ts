import { inputs as httpClientInputs } from "@prismatic-io/spectral/dist/clients/http";
import { API_VERSION, BASE_URL } from "../constants";
import { connectionInput } from "./shared";
const { debugRequest: _, ...rawRequestHttpInputs } = httpClientInputs;
export const rawRequestInputs = {
  connection: connectionInput,
  ...rawRequestHttpInputs,
  url: {
    ...rawRequestHttpInputs.url,
    comments: `Input the path only (/templates), The base URL is already included (${BASE_URL}/${API_VERSION}). For example, to connect to ${BASE_URL}/${API_VERSION}/templates, only /templates is entered in this field.`,
    example: "/templates",
  },
};

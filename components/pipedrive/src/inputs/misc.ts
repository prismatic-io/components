import { inputs as httpClientInputs } from "@prismatic-io/spectral/dist/clients/http";
import { connectionInput, apiVersion } from "./common";
import { BASE_URL } from "../constants";
const { debugRequest: _, ...rawRequestHttpInputs } = httpClientInputs;
export const rawRequestInputs = {
  version: apiVersion,
  ...rawRequestHttpInputs,
  url: {
    ...rawRequestHttpInputs.url,
    comments: `Input the path only (/files), The base URL is already included (${BASE_URL}). For example, to connect to ${BASE_URL}/files, only /files is entered in this field.`,
    example: "/files",
  },
  connection: connectionInput,
};

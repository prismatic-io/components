import { inputs as httpClientInputs } from "@prismatic-io/spectral/dist/clients/http";
import { BASE_URL } from "../constants";
import { connection, excludeAuthorization } from "./common";
const { debugRequest: _, ...rawRequestHttpInputs } = httpClientInputs;
export const rawRequestInputs = {
  connection,
  excludeAuthorization,
  ...rawRequestHttpInputs,
  url: {
    ...rawRequestHttpInputs.url,
    comments: `Input the path only (/api/accounts), The base URL is already included (${BASE_URL}). For example, to connect to ${BASE_URL}/api/accounts, only /api/accounts is entered in this field.`,
    example: "/api/accounts",
  },
};

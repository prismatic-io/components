import type { Connection } from "@prismatic-io/spectral";
import {
  createClient,
  type HttpClient,
} from "@prismatic-io/spectral/dist/clients/http";
import constants from "./constants";
import { getBearerToken, validateConnection } from "./util";
export const createClickUpClient = (
  clickUpConnection: Connection,
  debug = false,
): HttpClient => {
  validateConnection(clickUpConnection);
  return createClient({
    debug,
    baseUrl: constants.CLICK_UP_API_URL,
    responseType: "json",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${getBearerToken(clickUpConnection)}`,
    },
  });
};

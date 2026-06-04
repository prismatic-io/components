import type { Connection } from "@prismatic-io/spectral";
import { createClient, type HttpClient } from "@prismatic-io/spectral/dist/clients/http";
import constants from "./constants";

export const createClickUpClient = (clickUpConnection: Connection, debug = false): HttpClient => {
  return createClient({
    debug,
    baseUrl: constants.CLICK_UP_API_URL,
    headers: {
      Authorization: `Bearer ${clickUpConnection?.token?.access_token || clickUpConnection?.fields?.apiKey}`,
    },
  });
};

import type { Connection } from "@prismatic-io/spectral";
import { createClient } from "@prismatic-io/spectral/dist/clients/http";
import { BASE_URL, BASE_URL_V3 } from "./constants";

export const getZendeskClient = (
  zendeskSellConnection: Connection,
  debug: boolean,
  useV3?: boolean,
) =>
  createClient({
    baseUrl: useV3 ? BASE_URL_V3 : BASE_URL,
    headers: {
      authorization: `Bearer ${zendeskSellConnection?.token?.access_token}`,
    },
    debug,
  });

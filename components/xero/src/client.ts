import { Connection, util } from "@prismatic-io/spectral/dist/";
import {
  createClient as createHttpClient,
  HttpClient,
} from "@prismatic-io/spectral/dist/clients/http";
import { getTenant } from "./getTenant";
import { validateConnection } from "./util";

export const getXeroClient = async (
  xeroConnection: Connection,
  debug: boolean,
): Promise<HttpClient> => {
  validateConnection(xeroConnection);
  const tenantId = await getTenant(xeroConnection, debug);

  return createHttpClient({
    baseUrl: "https://api.xero.com/api.xro/2.0",
    headers: {
      Authorization: `Bearer ${util.types.toString(
        xeroConnection?.token?.access_token,
      )}`,
      Accepts: "application/json",
      "Xero-Tenant-Id": tenantId,
    },
    debug,
  });
};

export const getUnauthorizedClient = (
  xeroConnection: Connection,
  debug: boolean,
): HttpClient => {
  validateConnection(xeroConnection);
  return createHttpClient({
    baseUrl: "https://api.xero.com",
    headers: {
      Authorization: `Bearer ${util.types.toString(
        xeroConnection?.token?.access_token,
      )}`,
      Accepts: "application/json",
    },
    debug,
  });
};
